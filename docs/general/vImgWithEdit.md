# vImgWithEdit

## Props

| Name                | Type     | Description | Default     |
| ------------------- | -------- | ----------- | ----------- |
| `dialog-max-width`  | `String` |             | `"80vw"`    |
| `dialog-max-height` | `String` |             | `"80vh"`    |
| `v-model`           | `String` |             | `undefined` |

## Data

| Name            | Type      | Description | Initial value |
| --------------- | --------- | ----------- | ------------- |
| `dialog`        | `boolean` |             | `false`       |
| `isMouseHover`  | `boolean` |             | `false`       |
| `editComponent` | `any`     |             | `undefined`   |
| `toolbarButton` | `array`   |             | `[]`          |

## Events

| Name    | Description                                                                                               |
| ------- | --------------------------------------------------------------------------------------------------------- |
| `input` | <br/>**Arguments**<br/><ul><li>**`this.$refs.cropper.getCroppedCanvas().toDataURL(): unknown`**</li></ul> |

## Methods

### onMouseEnterImg()

**Syntax**

```typescript
onMouseEnterImg(): void
```

### onMouseLeaveImg()

**Syntax**

```typescript
onMouseLeaveImg(): void
```

### editImage()

**Syntax**

```typescript
editImage(): void
```

### saveImage()

**Syntax**

```typescript
saveImage(): void
```

### rotate()

**Syntax**

```typescript
rotate(angle: unknown): void
```
