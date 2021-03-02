# vDateField

## Props

| Name          | Type                      | Description | Default    |
| ------------- | ------------------------- | ----------- | ---------- |
| `v-model`     | `any`                     |             | `null`     |
| `birth-date`  | `Boolean`                 |             | `false`    |
| `picker-only` | `Boolean`                 |             | `false`    |
| `rules`       | `Array`                   |             | `()=>([])` |
| `only-future` | `Boolean` &#124; `String` |             | `false`    |
| `only-happen` | `Boolean` &#124; `String` |             | `false`    |
| `readonly`    | `Boolean`                 |             | `false`    |

## Data

| Name                 | Type      | Description | Initial value |
| -------------------- | --------- | ----------- | ------------- |
| `date`               | `unknown` |             | `null`        |
| `tempDate`           | `unknown` |             | `null`        |
| `isMenuOpen`         | `boolean` |             | `false`       |
| `isTextFieldFocused` | `boolean` |             | `false`       |
| `isTextFieldTyped`   | `boolean` |             | `false`       |

## Computed Properties

| Name            | Type      | Description                                                                               |
| --------------- | --------- | ----------------------------------------------------------------------------------------- |
| `minDate`       | `unknown` | **Dependencies:** `birthDate`                                                             |
| `maxDate`       | `unknown` | **Dependencies:** `birthDate`                                                             |
| `textReadOnly`  | `object`  | **Dependencies:** `pickerOnly`                                                            |
| `combinedRules` | `unknown` | **Dependencies:** `rules`, `onlyFuture`, `onlyFutureRule`, `onlyHappen`, `onlyHappenRule` |

## Events

| Name    | Description                                                  |
| ------- | ------------------------------------------------------------ |
| `input` | <br/>**Arguments**<br/><ul><li>**`newValue: any`**</li></ul> |

## Methods

### setDatePicker()

**Syntax**

```typescript
setDatePicker(date: unknown): void
```

### setDate()

**Syntax**

```typescript
setDate(DateString: unknown): void
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

### onlyFutureRule()

**Syntax**

```typescript
onlyFutureRule(date: unknown): void
```

### onlyHappenRule()

**Syntax**

```typescript
onlyHappenRule(): void
```

### onTextFieldClear()

**Syntax**

```typescript
onTextFieldClear(): void
```
