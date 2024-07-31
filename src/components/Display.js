import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

function Display() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [genderFilter, setGenderFilter] = useState('');
    const [countryFilter, setCountryFilter] = useState('');
    const itemsPerPage = 10; // Fixed number of records per page
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const customStyles = {
        table: { style: {  border: '1px solid lightgrey',
            borderRadius: '25px',
            overflow: 'hidden' } },
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

    const fetchUsers = async () => {
        setIsLoading(true); // Set loading state to true
        try {
            const totalResponse = await axios.get('https://dummyjson.com/users');
            const totalUsers = totalResponse.data.total;
            setTotalUsers(totalUsers);

            const limit = 100; // Set the desired limit per request
            console.log(limit);
            const responses = await Promise.all(
                Array.from({ length: Math.ceil(totalUsers / limit) }, (_, i) =>
                    axios.get('https://dummyjson.com/users', {
                        params: {
                            limit,
                            skip: i * limit
                        }
                    })
                )
            );

            const allUsers = responses.flatMap(res => res.data.users);
            setUsers(allUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        setIsLoading(false); // Set loading state to false
    };

    useEffect(() => {
        fetchUsers(); // Fetch users when the component mounts
    }, []);

    const filteredUsers = users.filter(user => {
        const matchesGender = genderFilter ? user.gender === genderFilter : true;
        const matchesCountry = countryFilter ? user.address.country === "United States" : true; // Assuming all users are from the USA
        return matchesGender && matchesCountry;
    });

    // Calculate the current users to display based on pagination
    const indexOfLastItem = currentPage * itemsPerPage;   // Last item index
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;  // First item index
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem); // Get current users

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleGenderChange = (event) => {
        setGenderFilter(event.target.value);
    };

    const handleCountryChange = (event) => {
        setCountryFilter(event.target.value);
    };

    return (
       
        
        <div className="container">
           
             <div class="card">
             <div class="row">
  <div class="col-md-11">
      <img src="/pixel6-logo.jpg" class="img-fluid mx-auto img1 mx-2" alt=""/>
    </div>
    <div class="col-md-1">
      <i class="fa fa-bars mx-auto icon-bar"></i>
    </div>
  </div>
             <hr/>
  <div class="card-body">
  <div class="row">
  
  </div>
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
                                data={currentUsers} // Use currentUsers for pagination
                                customStyles={customStyles}
                                
                               
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

export default Display;