# vCodeEditor

## Props

| Name           | Type      | Description | Default |
| -------------- | --------- | ----------- | ------- |
| `lang`         | `String`  |             | `"vue"` |
| `v-model`      | `String`  |             | `""`    |
| `line-numbers` | `Boolean` |             | `true`  |
| `light`        | `Boolean` |             | `false` |

## Data

| Name      | Type     | Description | Initial value |
| --------- | -------- | ----------- | ------------- |
| `content` | `string` |             | `""`          |

## Computed Properties

| Name        | Type     | Description                                      |
| ----------- | -------- | ------------------------------------------------ |
| `cmOptions` | `object` | **Dependencies:** `lang`, `light`, `lineNumbers` |

## Events

| Name    | Description                                                |
| ------- | ---------------------------------------------------------- |
| `input` | <br/>**Arguments**<br/><ul><li>**`newVal: any`**</li></ul> |

## Methods

### onFocus()

**Syntax**

```typescript
onFocus(): void
```
