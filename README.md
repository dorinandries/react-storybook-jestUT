# Order Management Demo

This project is a modern React + TypeScript demo application for managing and tracking customer orders. It showcases a component-driven architecture, interactive UI, and robust testing and documentation using Storybook and Jest.

---

## 🚀 Key Features

- **Order Dashboard**  
  View a list of all customer orders in a responsive grid layout.

- **Order Details & Timeline**  
  Click any order to see detailed information, including a timeline of all order stages (created, validated, picked up, etc.).

- **Stage Management**  
  Add, edit, or update stages for each order. Each stage displays status, description, and extra notes.

- **Order Status Actions**  
  Mark orders as completed or canceled directly from the details panel.

- **Customer Info**  
  Instantly view customer contact and address details for each order.

- **Interactive Modals**  
  Add or edit order stages using accessible, form-driven modals.

- **Visual Status Indicators**  
  Color-coded badges and animated indicators for order and stage statuses.

- **Component-Driven Development**  
  All UI elements are built as reusable, isolated components.

- **Storybook Integration**  
  Browse and interact with all UI components in isolation for rapid development and documentation.

- **Comprehensive Testing**  
  Unit and integration tests for all major components using Jest and React Testing Library.

---

## 🎯 Purpose

This project is designed as a reference implementation for:

- Building scalable, maintainable React applications with TypeScript.
- Demonstrating best practices in UI state management, component composition, and styling.
- Providing a robust foundation for order or workflow management systems.
- Serving as a playground for Storybook and testing integration.

---

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **Styled Components** for modular, themeable styles
- **Jest** & **React Testing Library** for testing
- **Storybook** for component documentation and visual testing
- **Mock Data** for rapid prototyping

---

## 📦 Getting Started

1. **Install dependencies**

   ```sh
   npm install
   ```

2. **Run the app**

   ```sh
   npm start
   ```

3. **Run Storybook**

   ```sh
   npm run storybook
   ```

4. **Run tests**
   ```sh
   npm test
   ```

---

## 📚 Project Structure

- `src/components/` – All UI components (OrderCard, OrderDetails, Timeline, etc.)
- `src/pages/Orders/` – Main Orders page logic and helpers
- `src/mock/` – Mock order data for development/testing
- `src/types/` – TypeScript type definitions
- `src/utilities/` – Utility functions (date formatting, etc.)
- `src/stories/` – Storybook stories and assets

---

## 👀 Demo Scenarios

- View all orders and their statuses at a glance.
- Drill down into any order to see its full timeline and customer details.
- Add new stages or update existing ones for any order.
- Mark orders as completed or canceled, with the timeline updating accordingly.
- Explore and test UI components in isolation via Storybook.
