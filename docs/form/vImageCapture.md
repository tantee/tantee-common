# vImageCapture

## Props

| Name           | Type      | Description | Default       |
| -------------- | --------- | ----------- | ------------- |
| `v-model`      | `any`     |             | `null`        |
| `image-format` | `String`  |             | `"image/png"` |
| `auto-start`   | `Boolean` |             | `false`       |

## Data

| Name              | Type      | Description | Initial value |
| ----------------- | --------- | ----------- | ------------- |
| `isCaptured`      | `boolean` |             | `false`       |
| `isCameraStarted` | `boolean` |             | `false`       |
| `imageData`       | `unknown` |             | `null`        |

## Computed Properties

| Name              | Type     | Description                   |
| ----------------- | -------- | ----------------------------- |
| `hasGetUserMedia` | `any`    |                               |
| `hasMediaCapture` | `object` |                               |
| `imageSrc`        | `object` | **Dependencies:** `imageData` |

## Events

| Name    | Description                                                   |
| ------- | ------------------------------------------------------------- |
| `input` | <br/>**Arguments**<br/><ul><li>**`imageData: any`**</li></ul> |

## Methods

### captureImage()

**Syntax**

```typescript
captureImage(): void
```

### captureImageFile()

**Syntax**

```typescript
captureImageFile(e: unknown): void
```

### reset()

**Syntax**

```typescript
reset(): void
```

### stopCamera()

**Syntax**

```typescript
stopCamera(): void
```

### startCamera()

**Syntax**

```typescript
startCamera(): void
```

### startMediaCapture()

**Syntax**

```typescript
startMediaCapture(): void
```
