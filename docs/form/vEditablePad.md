# vEditablePad

## Slots

| Name      | Description |
| --------- | ----------- |
| `default` | &nbsp;      |

## Props

| Name           | Type                    | Description | Default       |
| -------------- | ----------------------- | ----------- | ------------- |
| `update-api`   | `Array` &#124; `String` |             | `undefined`   |
| `initial-data` | `Object`                |             | `()=>{}`      |
| `title`        | `String`                |             | `"Form Data"` |
| `v-model`      | `Object`                |             | `()=>{}`      |
| `template`     | `String`                |             | `undefined`   |

## Data

| Name           | Type      | Description | Initial value |
| -------------- | --------- | ----------- | ------------- |
| `isEditing`    | `boolean` |             | `false`       |
| `editData`     | `object`  |             | `{}`          |
| `originalData` | `object`  |             | `{}`          |

## Computed Properties

| Name           | Type      | Description                                  |
| -------------- | --------- | -------------------------------------------- |
| `isDataChange` | `unknown` | **Dependencies:** `editData`, `originalData` |

## Methods

### saveData()

**Syntax**

```typescript
saveData(): void
```
