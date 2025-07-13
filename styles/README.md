# Styles Organization

This folder contains all the styles for the Pet Watch app, organized by component and screen.

## Structure

```
styles/
├── components/          # Component-specific styles
│   ├── PetCard.styles.ts
│   ├── PaymentSheet.styles.ts
│   ├── BottomSheet.styles.ts
│   └── ShimmerCard.styles.ts
├── screens/            # Screen-specific styles
│   ├── PetDetails.styles.ts
│   ├── Home.styles.ts
│   ├── MyPets.styles.ts
│   └── Location.styles.ts
├── index.ts           # Central export file
└── README.md          # This file
```

## Usage

### Importing Styles

All styles can be imported from the central index file:

```typescript
// Import component styles
import { petCardStyles, paymentSheetStyles } from "@/styles";

// Import screen styles
import { homeStyles, petDetailsStyles } from "@/styles";
```

### Using Styles in Components

```typescript
// In your component file
import { petCardStyles as styles } from '@/styles';

const MyComponent = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hello World</Text>
        </View>
    );
};
```

## Naming Convention

- Component styles: `{componentName}Styles`
- Screen styles: `{screenName}Styles`
- Import alias: `styles` (for consistency)

## Benefits

1. **Separation of Concerns**: Styles are separated from component logic
2. **Reusability**: Styles can be easily shared between components
3. **Maintainability**: Centralized style management
4. **Type Safety**: TypeScript support for all style objects
5. **Clean Imports**: Single import point for all styles

## Adding New Styles

1. Create a new `.styles.ts` file in the appropriate folder
2. Export the styles with the naming convention
3. Add the export to `styles/index.ts`
4. Import and use in your component/screen
