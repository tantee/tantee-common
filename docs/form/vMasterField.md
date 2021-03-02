# vMasterField

## Slots

| Name   | Description |
| ------ | ----------- |
| `slot` | &nbsp;      |

## Props

| Name                     | Type                                    | Description | Default     |
| ------------------------ | --------------------------------------- | ----------- | ----------- |
| `group-key`              | `String`                                |             | `undefined` |
| `custom-api`             | `String` &#124; `Array`                 |             | `undefined` |
| `custom-api-scope`       | `String`                                |             | `undefined` |
| `custom-api-scope-param` | `Number` &#124; `String` &#124; `Array` |             | `undefined` |
| `custom-api-field`       | `String` &#124; `Array`                 |             | `undefined` |
| `custom-api-text`        | `String`                                |             | `undefined` |
| `custom-api-value`       | `String`                                |             | `undefined` |
| `custom-api-eager-load`  | `Boolean`                               |             | `false`     |
| `search-min-length`      | `Number`                                |             | `3`         |
| `show-only`              | `Array`                                 |             | `undefined` |
| `show-except`            | `Array`                                 |             | `undefined` |
| `filter-text`            | `String` &#124; `Array` &#124; `Object` |             | `undefined` |
| `fuzzy-search`           | `Boolean`                               |             | `false`     |
| `wait-for-filter`        | `Boolean`                               |             | `false`     |
| `wait-for-filter-text`   | `String`                                |             | `undefined` |
| `show-code`              | `Boolean`                               |             | `false`     |
| `english`                | `Boolean`                               |             | `false`     |
| `multiple`               | `Boolean`                               |             | `false`     |
| `chips`                  | `Boolean`                               |             | `false`     |
| `v-model`                | `any`                                   |             | `null`      |
| `value-object`           | `any`                                   |             | `undefined` |

## Data

| Name                      | Type      | Description | Initial value |
| ------------------------- | --------- | ----------- | ------------- |
| `items`                   | `array`   |             | `[]`          |
| `isLoading`               | `boolean` |             | `false`       |
| `search`                  | `unknown` |             | `null`        |
| `debounceSearchCustomApi` | `any`     |             | `undefined`   |

## Computed Properties

| Name         | Type      | Description                                                                                                                          |
| ------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `itemText`   | `unknown` | **Dependencies:** `showCode`, `customApi`, `english`, `customApiValue`, `customApiText`                                              |
| `itemValue`  | `unknown` | **Dependencies:** `customApi`, `customApiValue`                                                                                      |
| `noDataText` | `unknown` | **Dependencies:** `waitForFilter`, `filterText`, `waitForFilterText`, `customApi`, `customApiEagerLoad`, `search`, `searchMinLength` |

## Methods

### loadData()

**Syntax**

```typescript
loadData(): void
```

### searchCustomApi()

**Syntax**

```typescript
searchCustomApi(returnAll: any = undefined): void
```

### filterData()

**Syntax**

```typescript
filterData(item: unknown, queryText: unknown, itemText: unknown): void
```
