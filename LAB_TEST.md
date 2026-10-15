# MERN Item Manager — Mock Practical Test

**Duration: 2 hours**

This is an independent practice test based on the preparation notice you supplied. It is not the official assessment or a prediction of its exact questions.

## Provided material

A starter MERN Item Manager with separate frontend and backend applications. The existing item fields are name and quantity. Listing, creating and deleting items have been implemented. Updating items is incomplete. The frontend initially points to a local backend.

## Your task

Complete and extend the supplied project, test it using your own MongoDB Atlas database, publish the source to a public GitHub repository, and deploy the frontend and backend separately using free hosting platforms.

### 1. Complete the application

- Implement the missing backend update operation.
- A valid update must persist and return the updated item.
- Return a suitable response when an item does not exist.
- Invalid updates must not bypass the model's validation rules.

### 2. Extend the item data

Add the following fields throughout the application:

| Field | Type | Requirements |
| --- | --- | --- |
| category | String | Required; non-empty after trimming |
| price | Number | Required; zero or greater; support decimal prices |

- Users must be able to enter, save, view and edit both fields.
- Both fields must persist in MongoDB.
- Display prices to two decimal places.
- Required fields and invalid numeric values must produce useful validation feedback.
- The page must remain usable if an older item has no category or price.

### 3. Test locally

- Use your own MongoDB Atlas connection string.
- Verify create, read, update and delete operations.
- Refresh the browser after saving and deleting to verify persistence.
- Verify valid zero values and invalid negative or missing values.
- Verify that the frontend production build succeeds.

### 4. Publish source code

- Publish both applications in one public GitHub repository.
- Include the source files, dependency manifests and lockfiles.
- Provide a short README with setup instructions and deployed URLs.
- Do not publish real connection strings, passwords, environment files or installed dependencies.
- Environment examples may contain placeholders only.

### 5. Deploy and connect

- Deploy the backend as a running API service on a free hosting platform.
- Deploy the frontend separately on a free hosting platform.
- Configure the frontend to call the deployed backend.
- Configure backend browser access for the deployed frontend origin.
- Configure Atlas network access so the deployed backend can connect.
- Test all item operations through the public frontend URL.

## Submit

1. Public GitHub repository URL.
2. Public frontend URL.
3. Public backend URL.
4. Your completed source code and README in the repository.

Begin the two-hour timer before inspecting and configuring the project. This package intentionally contains no worked answers or step-by-step walkthrough.
