# vDigitalTimePicker

## Props

| Name      | Type     | Description | Default     |
| --------- | -------- | ----------- | ----------- |
| `v-model` | `String` |             | `undefined` |

## Data

| Name     | Type  | Description | Initial value |
| -------- | ----- | ----------- | ------------- |
| `hour`   | `any` |             | `undefined`   |
| `minute` | `any` |             | `undefined`   |

## Events

| Name     | Description                                                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `input`  | <br/>**Arguments**<br/><ul><li>**`String(this.hour).padStart(2,'0') + ':' + String(this.minute).padStart(2,'0'): unknown`**</li></ul> |
| `change` | <br/>**Arguments**<br/><ul><li>**`String(this.hour).padStart(2,'0') + ':' + String(this.minute).padStart(2,'0'): unknown`**</li></ul> |

## Methods

### emitValue()

**Syntax**

```typescript
emitValue(): void
```

### setTime()

**Syntax**

```typescript
setTime(): void
```
