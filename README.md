# Face Recognition App Client Side


The following face recognition web app analyses URL of photos submitted by users and detects faces in the photos. Any user can copy and paste URL of some photo from the Internet. If there are faces in the photo, the web app will detect faces and put ‘boxes’ over it. The front end passes the URL to the backend, and the web server passes the URL to Clarifai API, and waits for an answer.  Afterwards, the backend sends the response back to the frontend.   
The client side of the web app was built with React. 

The face recognition web app is a <strong>PERN</strong> stack project. (PostgreSQL, Express, React, Native) 
