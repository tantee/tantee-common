# vConfirmDialog

## Props

| Name                 | Type     | Description | Default     |
| -------------------- | -------- | ----------- | ----------- |
| `button-true-text`   | `String` |             | `"Yes"`     |
| `button-false-text`  | `String` |             | `"No"`      |
| `button-true-color`  | `String` |             | `"primary"` |
| `button-false-color` | `String` |             | `"grey"`    |
| `color`              | `String` |             | `"warning"` |
| `icon`               | `String` |             | `"warning"` |
| `message`            | `String` |             |             |
| `title`              | `String` |             |             |
| `width`              | `Number` |             | `300`       |

## Events

| Name     | Description                                               |
| -------- | --------------------------------------------------------- |
| `result` | <br/>**Arguments**<br/><ul><li>**`value: any`**</li></ul> |

## Methods

### choose()

**Syntax**

```typescript
choose(value: unknown): void
```

### change()

**Syntax**

```typescript
change(res: unknown): void
```
