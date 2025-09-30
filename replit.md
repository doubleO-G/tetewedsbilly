# Stacey & Richie Wedding Website

## Overview

This is a modern React-based wedding website for Stacey and Richie's upcoming wedding on November 15th, 2025. The website serves as a central hub for wedding information, couple introductions, and guest support functionality. Built with React, TypeScript, and modern UI components, it provides an elegant and responsive experience for wedding guests to learn about the couple, view wedding details, and contribute to their special day through monetary gifts or service offerings.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application follows a modern React SPA (Single Page Application) architecture using Vite as the build tool. The codebase is organized with a component-based structure utilizing TypeScript for type safety. Key architectural decisions include:

- **React Router**: Client-side routing with three main pages (Landing, Meet Couple, Support)
- **Component Architecture**: Modular components with clear separation of concerns
- **UI Framework**: Radix UI primitives with shadcn/ui components for consistent design
- **Styling**: Tailwind CSS with custom design tokens and HSL color system
- **State Management**: React Query for server state management and React hooks for local state

### Design System
The application implements a comprehensive design system with:
- **Typography**: Playfair Display (serif) for headings and Inter (sans-serif) for body text
- **Color Palette**: Custom HSL-based color system with primary, secondary, accent, and muted variants
- **Component Library**: Extensive shadcn/ui component collection for consistent UI elements
- **Responsive Design**: Mobile-first approach with Tailwind responsive breakpoints

### Form Handling
Forms utilize React Hook Form with Zod validation for type-safe form management. The architecture supports both controlled and uncontrolled inputs with proper error handling and validation feedback.

### Development Workflow
The project uses modern development tools including ESLint for code quality, TypeScript for type checking, and Vite for fast development and building. The configuration is optimized for both development and production environments.

## External Dependencies

### UI and Styling
- **@radix-ui/***: Comprehensive collection of unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework for responsive design
- **class-variance-authority**: Type-safe variant API for component styling
- **lucide-react**: Modern icon library for consistent iconography
- **next-themes**: Theme switching capabilities

### Database and Backend
- **@supabase/supabase-js**: Integration with Supabase for backend services and real-time data
- **@neondatabase/serverless**: Neon database integration for serverless deployments
- **drizzle-orm**: Type-safe ORM for database operations

### Payment Processing
- **react-paystack**: Integration with Paystack payment gateway for monetary contributions

### Development Tools
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Form validation resolvers
- **date-fns**: Date utility library for formatting and manipulation
- **embla-carousel-react**: Carousel component for image galleries
- **react-day-picker**: Date picker component for calendar functionality

### Development and Build
- **vite**: Fast build tool and development server
- **@vitejs/plugin-react-swc**: React plugin with SWC for faster compilation
- **typescript**: Type checking and development experience
- **eslint**: Code linting and quality enforcement
- **lovable-tagger**: Development tool for component identification (development mode only)

The architecture emphasizes performance, accessibility, and maintainability while providing a seamless user experience for wedding guests to engage with the couple's special day.