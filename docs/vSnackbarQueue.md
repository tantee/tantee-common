# vSnackbarQueue

## Props

| Name       | Type      | Description | Default |
| ---------- | --------- | ----------- | ------- |
| `location` | `String`  |             | `"top"` |
| `top`      | `Boolean` |             | `false` |
| `left`     | `Boolean` |             | `false` |
| `right`    | `Boolean` |             | `false` |
| `bottom`   | `Boolean` |             | `false` |
| `timeout`  | `Number`  |             | `6000`  |

## Data

| Name           | Type      | Description | Initial value                                                                                                                                                                |
| -------------- | --------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isShowing`    | `boolean` |             | `false`                                                                                                                                                                      |
| `currentAlert` | `object`  |             | `{}`                                                                                                                                                                         |
| `alertColor`   | `object`  |             | `{"info":{"type":"string","value":"grey darken-4","raw":"\"grey darken-4\""},"warning":{"type":"string","value":"deep-orange lighten-2","raw":"\"deep-orange lighten-2\""}}` |

## Computed Properties

| Name              | Type      | Description                            |
| ----------------- | --------- | -------------------------------------- |
| `hasAlertPending` | `boolean` | **Dependencies:** `$store`, `location` |
| `getAlert`        | `unknown` | **Dependencies:** `$store`, `location` |

## Methods

### renewAlert()

**Syntax**

```typescript
renewAlert(): void
```

### registerLocation()

**Syntax**

```typescript
registerLocation(): void
```

