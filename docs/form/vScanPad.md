# vScanPad

## Props

| Name                 | Type    | Description | Default     |
| -------------------- | ------- | ----------- | ----------- |
| `v-model`            | `any`   |             | `()=>[]`    |
| `available-category` | `Array` |             | `undefined` |

## Data

| Name            | Type      | Description | Initial value                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------- | --------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `editComponent` | `any`     |             | `undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `scanData`      | `array`   |             | `[]`                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `isMouseHover`  | `boolean` |             | `false`                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `isUploading`   | `boolean` |             | `false`                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `isScanning`    | `boolean` |             | `false`                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `dialog`        | `boolean` |             | `false`                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `scanParam`     | `object`  |             | `{"feeder":{"type":"number","value":1,"raw":"1"},"duplex":{"type":"number","value":1,"raw":"1"},"color":{"type":"number","value":2,"raw":"2"},"resolution":{"type":"number","value":150,"raw":"150"},"limit":{"type":"number","value":0,"raw":"0"},"top":{"type":"number","value":0,"raw":"0"},"left":{"type":"number","value":0,"raw":"0"},"width":{"type":"number","value":0,"raw":"0"},"height":{"type":"number","value":0,"raw":"0"}}` |

## Computed Properties

| Name          | Type      | Description                  |
| ------------- | --------- | ---------------------------- |
| `hasScanData` | `unknown` | **Dependencies:** `scanData` |

## Methods

### onUploadData()

**Syntax**

```typescript
onUploadData(files: unknown): void
```

### onScanData()

**Syntax**

```typescript
onScanData(): void
```

### onDeleteItem()

**Syntax**

```typescript
onDeleteItem(index: unknown): void
```
