# vDateTimeField

## Props

| Name                | Type                      | Description | Default         |
| ------------------- | ------------------------- | ----------- | --------------- |
| `v-model`           | `String`                  |             | `undefined`     |
| `disabled`          | `Boolean`                 |             | `false`         |
| `label`             | `String`                  |             | `"วันที่-เวลา"` |
| `default-date`      | `String` &#124; `Boolean` |             | `false`         |
| `default-date-time` | `String` &#124; `Boolean` |             | `false`         |
| `fixed-date`        | `Boolean`                 |             | `false`         |
| `rules`             | `Array`                   |             | `()=>([])`      |
| `only-future`       | `Boolean` &#124; `String` |             | `false`         |
| `only-happen`       | `Boolean` &#124; `String` |             | `false`         |
| `readonly`          | `Boolean`                 |             | `false`         |
| `dense`             | `Boolean`                 |             | `false`         |

## Data

| Name        | Type      | Description | Initial value |
| ----------- | --------- | ----------- | ------------- |
| `datePart`  | `unknown` |             | `null`        |
| `timePart`  | `unknown` |             | `null`        |
| `pauseEmit` | `boolean` |             | `false`       |

## Computed Properties

| Name            | Type      | Description                                                                               |
| --------------- | --------- | ----------------------------------------------------------------------------------------- |
| `combinedRules` | `unknown` | **Dependencies:** `rules`, `onlyFuture`, `onlyFutureRule`, `onlyHappen`, `onlyHappenRule` |

## Events

| Name    | Description                                                                                                               |
| ------- | ------------------------------------------------------------------------------------------------------------------------- |
| `input` | <br/>**Arguments**<br/><ul><li>**`(this.timePart) ? this.datePart+' '+this.timePart : this.datePart: unknown`**</li></ul> |

## Methods

### emitDateTime()

**Syntax**

```typescript
emitDateTime(): void
```

### setDateTime()

**Syntax**

```typescript
setDateTime(): void
```

### setDefaultDate()

**Syntax**

```typescript
setDefaultDate(): void
```

### setDefaultDateTime()

**Syntax**

```typescript
setDefaultDateTime(): void
```

### reset()

**Syntax**

```typescript
reset(): void
```

### onlyFutureRule()

**Syntax**

```typescript
onlyFutureRule(): unknown
```

### onlyHappenRule()

**Syntax**

```typescript
onlyHappenRule(): unknown
```
