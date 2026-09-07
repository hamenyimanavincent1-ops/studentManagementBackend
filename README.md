API Endpoints

1. Get All Students

Returns all students stored in the database.

Method
GET /
Full URL
https://studentmanagementbackend-b271.onrender.com/
Example using browser

Open:

https://studentmanagementbackend-b271.onrender.com/
Example response
[
  {
    "id": 1,
    "fullName": "Jean Claude Niyonzima",
    "email": "jean@example.com",
    "phone": "+250788111111",
    "gender": "male",
    "dateOfBirth": "2004-03-12"
  },
  {
    "id": 2,
    "fullName": "Marie Uwase",
    "email": "marie@example.com",
    "phone": "+250788222222",
    "gender": "female",
    "dateOfBirth": "2005-07-25"
  }
]
2. Add a Student

Adds a new student to the database.

Method
POST /insert_students
Full URL
https://studentmanagementbackend-b271.onrender.com/insert_students
Headers
Content-Type: application/json
Request body
{
  "fullName": "Jean Claude Niyonzima",
  "email": "jean@example.com",
  "phone": "+250788111111",
  "gender": "male",
  "dateOfBirth": "2004-03-12"
}
Success response

Status:

201 Created

Response:

Student added successfully
Example using JavaScript
fetch("https://studentmanagementbackend-b271.onrender.com/insert_students", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    fullName: "Jean Claude Niyonzima",
    email: "jean@example.com",
    phone: "+250788111111",
    gender: "male",
    dateOfBirth: "2004-03-12"
  })
})
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.error(error));
3. Update a Student

Updates an existing student using their ID.

Method
PUT /update_students/:id
Example
PUT /update_students/1
Full URL
https://studentmanagementbackend-b271.onrender.com/update_students/1
Headers
Content-Type: application/json
Request body
{
  "fullName": "Jean Claude Updated",
  "email": "jeanupdated@example.com",
  "phone": "+250788999999",
  "gender": "male",
  "dateOfBirth": "2004-03-12"
}
Success response
Student updated successfully
4. Delete a Student

Deletes a student using their ID.

Method
DELETE /delete_students/:id
Example
DELETE /delete_students/1
Full URL
https://studentmanagementbackend-b271.onrender.com/delete_students/1
Success response
Student deleted successfully


API Summary

Method	Endpoint	Purpose

GET	/	Get all students  view all students

POST	/insert_students	Add a student

PUT	/update_students/:id	Update a student

DELETE	/delete_students/:id	Delete a student