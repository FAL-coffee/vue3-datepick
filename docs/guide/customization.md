# Customization Guide

## Custom Styles

You can easily apply custom CSS to style the `vue3-datepick` component according to your project needs.

Example:

```css
.datepick {
  background-color: #f0f0f0;
  border-radius: 8px;
}
```

## Slots

`vue3-datepick` supports named slots for customizing the internal content of the date picker.

### Custom Header

You can replace the default header with your own custom content:

```vue
<DatePick>
  <template #header>
    <h3>Select a Date</h3>
  </template>
</DatePick>
```

### Custom Footer

You can also customize the footer content by using the `footer` slot:

```vue
<DatePick>
  <template #footer>
    <p>Custom Footer Content</p>
  </template>
</DatePick>
```

## Date Format Customization

You can easily customize how the date is displayed using the `displayFormat` prop. The default format is `YYYY-MM-DD`.

Example:

```vue
<DatePick v-model="selectedDate" display-format="DD/MM/YYYY" />
```

## Disable Specific Dates

You can disable specific dates (such as weekends) using the `isDateDisabled` function.

Example: Disable Sundays:

```vue
<DatePick v-model="selectedDate" :is-date-disabled="isDateDisabled" />

<script setup lang="ts">
const isDateDisabled = (date: Date) => {
  return date.getDay() === 0 // Disable Sundays
}
</script>
```
