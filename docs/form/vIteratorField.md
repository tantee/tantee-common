# vIteratorField

## Slots

| Name            | Description |
| --------------- | ----------- |
| `toolBarItem`   |             |
| `dataForm`      |             |
| `toolBarButton` |             |
| `item`          |             |
| `createPad`     | &nbsp;      |

## Props

| Name                  | Type       | Description | Default                                            |
| --------------------- | ---------- | ----------- | -------------------------------------------------- |
| `hide-toolbar`        | `Boolean`  |             | `false`                                            |
| `flat`                | `Boolean`  |             | `false`                                            |
| `title`               | `String`   |             | `null`                                             |
| `headers`             | `Array`    |             | `undefined`                                        |
| `item-key`            | `String`   |             | `"id"`                                             |
| `rows-per-page-items` | `Array`    |             | `() => { return [20,40,60,{text:'All',value:-1}]}` |
| `initial-data`        | `Object`   |             | `undefined`                                        |
| `default-data`        | `Object`   |             | `()=>({})`                                         |
| `searchable`          | `Boolean`  |             | `false`                                            |
| `importable`          | `Boolean`  |             | `false`                                            |
| `insertable`          | `Boolean`  |             | `true`                                             |
| `limit-total-items`   | `Number`   |             | `undefined`                                        |
| `expandable`          | `Boolean`  |             | `false`                                            |
| `refreshable`         | `Boolean`  |             | `false`                                            |
| `multiple-select`     | `Boolean`  |             | `false`                                            |
| `dialog-width`        | `String`   |             | `"80vw"`                                           |
| `dialog-height`       | `String`   |             | `"80vh"`                                           |
| `dialog-fullscreen`   | `Boolean`  |             | `false`                                            |
| `v-model`             | `Array`    |             | `() => ([])`                                       |
| `hide-actions`        | `Boolean`  |             | `false`                                            |
| `show-create-pad`     | `Boolean`  |             | `false`                                            |
| `create-pad-hook`     | `Function` |             | `undefined`                                        |
| `auto-item-action`    | `Boolean`  |             | `false`                                            |
| `column`              | `Number`   |             | `12`                                               |

## Data

| Name            | Type      | Description | Initial value |
| --------------- | --------- | ----------- | ------------- |
| `tableData`     | `array`   |             | `[]`          |
| `selected`      | `array`   |             | `[]`          |
| `isLoading`     | `boolean` |             | `false`       |
| `isImporting`   | `boolean` |             | `false`       |
| `formDialog`    | `boolean` |             | `false`       |
| `currentObject` | `object`  |             | `{}`          |
| `currentIndex`  | `number`  |             | `-1`          |
| `pagination`    | `object`  |             | `{}`          |
| `search`        | `any`     |             | `undefined`   |
| `padData`       | `object`  |             | `{}`          |

## Computed Properties

| Name                 | Type        | Description                                                     |
| -------------------- | ----------- | --------------------------------------------------------------- |
| `actions`            | `object`    | **Dependencies:** `createData`, `editData`, `deleteData`        |
| `computedHeaders`    | `undefined` | **Dependencies:** `headers`, `expandable`, `autoItemAction`     |
| `computedInsertable` | `unknown`   | **Dependencies:** `insertable`, `limitTotalItems`, `totalItems` |
| `totalItems`         | `object`    | **Dependencies:** `tableData`                                   |

## Events

| Name         | Description                                                |
| ------------ | ---------------------------------------------------------- |
| `selectItem` | <br/>**Arguments**<br/><ul><li>**`newVal: any`**</li></ul> |

## Methods

### onCreateData()

**Syntax**

```typescript
onCreateData(formData: unknown, callback: any = undefined): void
```

### onUpdateData()

**Syntax**

```typescript
onUpdateData(formData: unknown, callback: any = undefined): void
```

### onImportData()

**Syntax**

```typescript
onImportData(files: unknown): void
```

### createData()

**Syntax**

```typescript
createData(object: unknown): void
```

### newData()

**Syntax**

```typescript
newData(object: unknown): void
```

### editData()

**Syntax**

```typescript
editData(object: unknown): void
```

### deleteData()

**Syntax**

```typescript
deleteData(object: unknown): void
```

### createDataPad()

**Syntax**

```typescript
createDataPad(): void
```

### resetPad()

**Syntax**

```typescript
resetPad(): void
```

### rowClick()

**Syntax**

```typescript
rowClick(row: unknown): void
```

### loadData()

**Syntax**

```typescript
loadData(): void
```
