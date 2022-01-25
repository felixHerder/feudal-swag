E-commerce app for a fictional medieval clothing store built using firebase populated with mockdata.

Frontend is react with chakra-ui build with cra. Backend is firebase for authorization with email or google and firestore db for storing item and user data.

Redux and react-router is used heavily with url search params for preserving navigation history and application state on refresh/reload.

Firestore db queries are cached in memory as much as possible for a smoother ux and to decrease db load. Frontend is hosted on netlify.

Craco is used to enable Source Maps in creat-react-app during DEV mode
