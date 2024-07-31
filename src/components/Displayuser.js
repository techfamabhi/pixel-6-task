import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure, setGenderFilter, setCountryFilter, setCurrentPage } from './actions/actions';
import axios from 'axios';
import DataTable from 'react-data-table-component';

function Displayuser() {
    const dispatch = useDispatch();
    const { users, totalUsers, currentPage, itemsPerPage, genderFilter, countryFilter, isLoading } = useSelector((state) => state.users);

    useEffect(() => {
        const fetchUsers = async () => {
            dispatch(fetchUsersRequest());
            try {
                const totalResponse = await axios.get('https://dummyjson.com/users');
                const totalUsers = totalResponse.data.total;

                const limit = 100;
                const responses = await Promise.all(
                    Array.from({ length: Math.ceil(totalUsers / limit) }, (_, i) =>
                        axios.get('https://dummyjson.com/users', {
                            params: {
                                limit,
                                skip: i * limit,
                            },
                        })
                    )
                );

                const allUsers = responses.flatMap((res) => res.data.users);
                dispatch(fetchUsersSuccess({ users: allUsers, totalUsers }));
            } catch (error) {
                dispatch(fetchUsersFailure(error.message));
            }
        };

        fetchUsers();
    }, [dispatch]);

    const filteredUsers = users.filter((user) => {
        const matchesGender = genderFilter ? user.gender === genderFilter : true;
        const matchesCountry = countryFilter ? user.address.country === 'United States' : true;
        return matchesGender && matchesCountry;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        dispatch(setCurrentPage(page));
    };

    const handleGenderChange = (event) => {
        dispatch(setGenderFilter(event.target.value));
    };

    const handleCountryChange = (event) => {
        dispatch(setCountryFilter(event.target.value));
    };

    const customStyles = {
        table: { style: { border: '1px solid lightgrey', borderRadius: '25px', overflow: 'hidden' } },
        headRow: { style: { backgroundColor: 'white', color: 'black', borderBottom: '1px solid #ddd' } },
        headCells: { style: { fontSize: '16px', fontWeight: '600', textTransform: 'uppercase', borderBottom: '1px solid #ddd' } },
        cells: { style: { fontSize: '15px', borderBottom: '1px solid #ddd' } }
    };

    const columns = [
        { name: 'ID', selector: row => row.id, sortable: true },
        { name: 'Image', selector: row => <img src={row.image} alt={row.firstName} style={{ width: '50px', height: '50px' }} />, sortable: false },
        { name: 'Full Name', selector: row => `${row.firstName} ${row.maidenName} ${row.lastName}`, sortable: true },
        { name: 'Demography', selector: row => `${row.gender.charAt(0)}/${row.age}`, sortable: true },
        { name: 'Designation', selector: row => row.company.title, sortable: true },
        { name: 'Location', selector: row => `${row.address.state}, USA`, sortable: true }
    ];

    return (
        <div className="container">
            <div className="card">
                <div className="row">
                    <div className="col-md-11">
                      <a href="https://pixel-6-task.vercel.app/">  <img src="/pixel6-logo.JPG" className="img-fluid mx-auto img1 mx-2" alt="Logo" /> </a>
                    </div>
                    <div className="col-md-1">
                        <i className="fa fa-bars mx-auto icon-bar"></i>
                    </div>
                </div>
                <hr />
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-md-6 mt-3">
                            <h2>Employees</h2>
                        </div>
                        <div className="col-md-6 text-right">
                            <i className="fa fa-filter filter-icon" aria-hidden="true"></i>
                            <div className="form-group d-inline-block ml-4">
                                <select className="form-control-sm d-inline-block" id="country" onChange={handleCountryChange} style={{ width: 'auto' }}>
                                    <option value="">Select Country</option>
                                    <option value="United States">United States</option>
                                    {/* Add more countries as needed */}
                                </select>
                            </div>
                            <div className="form-group d-inline-block ml-4">
                                <select className="form-control-sm d-inline-block" id="gender" onChange={handleGenderChange} style={{ width: 'auto' }}>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <main className="container">
                                <section className="row mt-4">
                                    <DataTable
                                        columns={columns}
                                        data={currentUsers}
                                        customStyles={customStyles}
                                        progressPending={isLoading}
                                    />
                                </section>
                            </main>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-sm-6">
                            <b>Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredUsers.length)} of {filteredUsers.length} entries</b>
                        </div>
                        <div className="col-sm-6">
                            <ul className="pagination justify-content-end">
                                {Array(Math.ceil(filteredUsers.length / itemsPerPage)).fill().map((_, index) => (
                                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                        <button onClick={() => handlePageChange(index + 1)} className="page-link">{index + 1}</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Displayuser;
