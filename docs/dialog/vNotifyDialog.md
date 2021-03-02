# vNotifyDialog

## Props

| Name           | Type     | Description | Default     |
| -------------- | -------- | ----------- | ----------- |
| `button-text`  | `String` |             | `"Ok"`      |
| `button-color` | `String` |             | `"primary"` |
| `color`        | `String` |             | `"warning"` |
| `icon`         | `String` |             | `"warning"` |
| `message`      | `String` |             |             |
| `title`        | `String` |             |             |
| `width`        | `Number` |             | `300`       |

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
