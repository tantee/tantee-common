# vTimeField

## Props

| Name          | Type      | Description | Default |
| ------------- | --------- | ----------- | ------- |
| `v-model`     | `any`     |             | `null`  |
| `picker-only` | `Boolean` |             | `false` |
| `readonly`    | `Boolean` |             | `false` |

## Data

| Name                 | Type      | Description | Initial value |
| -------------------- | --------- | ----------- | ------------- |
| `time`               | `unknown` |             | `null`        |
| `tempTime`           | `unknown` |             | `null`        |
| `isMenuOpen`         | `boolean` |             | `false`       |
| `isTextFieldFocused` | `boolean` |             | `false`       |
| `isTextFieldTyped`   | `boolean` |             | `false`       |

## Computed Properties

| Name           | Type     | Description                    |
| -------------- | -------- | ------------------------------ |
| `textReadOnly` | `object` | **Dependencies:** `pickerOnly` |

## Events

| Name    | Description                                                  |
| ------- | ------------------------------------------------------------ |
| `input` | <br/>**Arguments**<br/><ul><li>**`newValue: any`**</li></ul> |

## Methods

### setTimePicker()

**Syntax**

```typescript
setTimePicker(time: unknown): void
```

### setTime()

**Syntax**

```typescript
setTime(timeString: unknown): void
```

### onTextFieldFocus()

**Syntax**

```typescript
onTextFieldFocus($event: unknown): void
```

### onTextFieldBlur()

**Syntax**

```typescript
onTextFieldBlur(): void
```

### onTextFieldTyped()

**Syntax**

```typescript
onTextFieldTyped(): void
```

### onTextFieldEnterKey()

**Syntax**

```typescript
onTextFieldEnterKey(): void
```

### reset()

**Syntax**

```typescript
reset(): void
```

### onTextFieldClear()

**Syntax**

```typescript
onTextFieldClear(): void
```
