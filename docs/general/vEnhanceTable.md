# vEnhanceTable

## Slots

| Name          | Description |
| ------------- | ----------- |
| `slot`        |             |
| `body.append` | &nbsp;      |

## Props

| Name            | Type      | Description | Default  |
| --------------- | --------- | ----------- | -------- |
| `single-select` | `Boolean` |             | `false`  |
| `items`         | `Array`   |             | `()=>[]` |
| `v-model`       | `Array`   |             | `()=>[]` |

## Data

| Name               | Type    | Description | Initial value     |
| ------------------ | ------- | ----------- | ----------------- |
| `selected`         | `array` |             | `[]`              |
| `disableAutoSlots` | `array` |             | `['body.append']` |

## Methods

### rowClick()

**Syntax**

```typescript
rowClick(row: unknown): void
```
