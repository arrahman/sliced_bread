# Greatest Beverage

Congratulations! After years of tinkering with your secret recipe you have managed to create the world's greatest beverage. Inspired by some of the great modern day entrepreneurs, you have chosen to sell your beverage directly to consumers from your site. With an MVP perspective, you have chosen to ship a minimal set of features to start with the intention of improving the site based off of your customers' feedback.

## Getting Started

We've created a shell application that should provide you with a basic application to get started really quickly. It is using yarn classic `1.22.22` as the package manager. From the root of the project run the following commands to get started:

```bash
yarn install
yarn dev
```

### Create a landing page that

- [x] Tells the visitor what your drink is called
- [x] Includes an image (or images) that has your drink in it.
- [x] Describe the drink so everyone understands why it’s the greatest beverage ever.
- [x] A privacy focused “pay me later” order form that contains the following:
- [x] Customers name
- [x] Quantity of drinks to purchase
- [x] City
- [x] State/Province
- [x] Country
- [x] An order button

### After ordering

- [x] Confirmation that the order succeeded
- [x] Provide order confirmation number
- [x] Provide unique URL to see order confirmation & details

#### Notes

## Features

- **Customer Privacy Protection**  
  Customers can only access their orders through **expirable, signed URLs**, securely generated using the [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken) package.

- **Future Enhancements**
  - **Guest Users** will be able to request a new signed URL via email if their previous link expires.
  - **Authenticated Users** will automatically receive a new signed URL using a **refreshed token**.
  - Storing data to real database using ORM

- **Optional Fields**  
  Customer **name** and **quantity of drinks** are optional. If not provided, default values are generated using the [`faker`](https://www.npmjs.com/package/@faker-js/faker) package.

- **Required Fields**  
  `City`, `State/Province`, and `Country` are **mandatory** for order submission.

- **Robust Data Validation**  
  Validation is enforced on **both client and server sides** using the [`Zod`](https://www.npmjs.com/package/zod) schema validation library to ensure data integrity and consistency.

### AI Tooling

 **AI-Assisted UI and Testing**  
  The UI components and test cases were designed and generated with the help of **ChatGPT**, accelerating development while maintaining code quality and accessibility.



### Loom Submission

- [`Project Presentation`](https://www.loom.com/share/35703d0007b04c349ae5dcea7e1c0f95)

