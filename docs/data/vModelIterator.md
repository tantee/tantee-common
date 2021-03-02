# vModelIterator

## Slots

| Name            | Description |
| --------------- | ----------- |
| `toolBarItem`   |             |
| `modelForm`     |             |
| `toolBarButton` |             |
| `item`          | &nbsp;      |

## Props

| Name                | Type      | Description | Default     |
| ------------------- | --------- | ----------- | ----------- |
| `hide-toolbar`      | `Boolean` |             | `false`     |
| `flat`              | `Boolean` |             | `false`     |
| `searchable`        | `Boolean` |             | `false`     |
| `importable`        | `Boolean` |             | `false`     |
| `insertable`        | `Boolean` |             | `true`      |
| `limit-total-items` | `Number`  |             | `undefined` |
| `refreshable`       | `Boolean` |             | `true`      |
| `multiple-select`   | `Boolean` |             | `false`     |
| `dialog-width`      | `String`  |             | `"80vw"`    |
| `dialog-height`     | `String`  |             | `"80vh"`    |
| `dialog-fullscreen` | `Boolean` |             | `false`     |
| `column`            | `Number`  |             | `12`        |

## Data

| Name            | Type      | Description | Initial value |
| --------------- | --------- | ----------- | ------------- |
| `selected`      | `array`   |             | `[]`          |
| `currentObject` | `object`  |             | `{}`          |
| `formDialog`    | `boolean` |             | `false`       |
| `search`        | `any`     |             | `undefined`   |

## Computed Properties

| Name                 | Type      | Description                                                                             |
| -------------------- | --------- | --------------------------------------------------------------------------------------- |
| `title`              | `unknown` | **Dependencies:** `modelTitle`, `modelName`                                             |
| `actions`            | `object`  | **Dependencies:** `editData`, `deleteData`, `refreshData`, `saveData`, `loadData`       |
| `computedInsertable` | `unknown` | **Dependencies:** `insertable`, `limitTotalItems`, `totalItems`, `apiData`, `modelName` |

## Events

| Name         | Description                                                |
| ------------ | ---------------------------------------------------------- |
| `selectItem` | <br/>**Arguments**<br/><ul><li>**`newVal: any`**</li></ul> |

## Methods

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

### rowClick()

**Syntax**

```typescript
rowClick(row: unknown): void
```

### saveData()

**Syntax**

```typescript
saveData(object: unknown): void
```
