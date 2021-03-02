# vModelTable

## Slots

| Name            | Description |
| --------------- | ----------- |
| `toolBarItem`   |             |
| `toolBarSearch` |             |
| `modelForm`     |             |
| `toolBarButton` |             |
| `slot`          |             |
| `body.append`   | &nbsp;      |

## Props

| Name                     | Type                     | Description | Default     |
| ------------------------ | ------------------------ | ----------- | ----------- |
| `hide-toolbar`           | `Boolean`                |             | `false`     |
| `hide-insert-button`     | `Boolean`                |             | `false`     |
| `flat`                   | `Boolean`                |             | `false`     |
| `headers`                | `Array`                  |             | `undefined` |
| `searchable`             | `Boolean`                |             | `false`     |
| `importable`             | `Boolean`                |             | `false`     |
| `exportable`             | `Boolean`                |             | `false`     |
| `insertable`             | `Boolean`                |             | `true`      |
| `default-items-per-page` | `String` &#124; `Number` |             | `10`        |
| `limit-total-items`      | `Number`                 |             | `undefined` |
| `expandable`             | `Boolean`                |             | `false`     |
| `single-expand`          | `Boolean`                |             | `false`     |
| `refreshable`            | `Boolean`                |             | `true`      |
| `multiple-select`        | `Boolean`                |             | `false`     |
| `dialog-width`           | `String`                 |             | `"80vw"`    |
| `dialog-height`          | `String`                 |             | `"80vh"`    |
| `dialog-fullscreen`      | `Boolean`                |             | `false`     |
| `auto-item-action`       | `Boolean`                |             | `false`     |
| `show-select`            | `Boolean`                |             | `false`     |
| `keyword`                | `String`                 |             | `undefined` |
| `group-by`               | `String` &#124; `Array`  |             | `()=>[]`    |
| `group-desc`             | `Boolean` &#124; `Array` |             | `()=>[]`    |
| `show-group-by`          | `Boolean`                |             | `false`     |
| `v-model`                | `Array`                  |             | `()=>[]`    |
| `create-permission`      | `String`                 |             | `undefined` |
| `update-permission`      | `String`                 |             | `undefined` |
| `delete-permission`      | `String`                 |             | `undefined` |
| `readonly`               | `Boolean`                |             | `false`     |

## Data

| Name               | Type      | Description | Initial value                 |
| ------------------ | --------- | ----------- | ----------------------------- |
| `search`           | `any`     |             | `undefined`                   |
| `selected`         | `array`   |             | `[]`                          |
| `expanded`         | `array`   |             | `[]`                          |
| `formDialog`       | `boolean` |             | `false`                       |
| `currentObject`    | `object`  |             | `{}`                          |
| `disableAutoSlots` | `array`   |             | `['modelForm','body.append']` |

## Computed Properties

| Name                 | Type        | Description                                                                                         |
| -------------------- | ----------- | --------------------------------------------------------------------------------------------------- |
| `title`              | `unknown`   | **Dependencies:** `modelTitle`, `modelName`                                                         |
| `actions`            | `object`    | **Dependencies:** `editData`, `deleteData`, `refreshData`, `saveData`, `loadData`, `expand`         |
| `computedHeaders`    | `undefined` | **Dependencies:** `headers`, `autoItemAction`, `readonly`                                           |
| `computedInsertable` | `unknown`   | **Dependencies:** `insertable`, `readonly`, `limitTotalItems`, `totalItems`, `apiData`, `modelName` |

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

### rowClick()

**Syntax**

```typescript
rowClick(row: unknown): void
```

### expand()

**Syntax**

```typescript
expand(row: unknown): void
```

### editData()

**Syntax**

```typescript
editData(object: unknown): void
```

### saveData()

**Syntax**

```typescript
saveData(object: unknown, callback: any = undefined): void
```
