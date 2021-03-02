# vInfoDialog

## Slots

| Name             | Description |
| ---------------- | ----------- |
| `activateButton` |             |
| `title`          |             |
| `content`        | &nbsp;      |

## Props

| Name                   | Type      | Description | Default   |
| ---------------------- | --------- | ----------- | --------- |
| `max-width`            | `String`  |             | `"80vw"`  |
| `max-height`           | `String`  |             | `"80vh"`  |
| `form-title`           | `String`  |             | `null`    |
| `is-show-dialog`       | `Boolean` |             | `false`   |
| `fullscreen`           | `Boolean` |             | `false`   |
| `close-caption`        | `String`  |             | `"Close"` |
| `hide-activate-button` | `Boolean` |             | `false`   |
| `hide-title`           | `Boolean` |             | `false`   |
| `activate-button-text` | `String`  |             | `"New"`   |
| `disabled`             | `Boolean` |             | `false`   |

## Data

| Name        | Type      | Description | Initial value |
| ----------- | --------- | ----------- | ------------- |
| `isShowing` | `boolean` |             | `false`       |

## Events

| Name            | Description                                                |
| --------------- | ---------------------------------------------------------- |
| `showingChange` | <br/>**Arguments**<br/><ul><li>**`newVal: any`**</li></ul> |

## Methods

### closeDialog()

**Syntax**

```typescript
closeDialog(): void
```

### showDialog()

**Syntax**

```typescript
showDialog(): void
```

