# vAlertPanel

## Props

| Name        | Type     | Description | Default     |
| ----------- | -------- | ----------- | ----------- |
| `location`  | `String` |             | `"default"` |
| `max-alert` | `Number` |             | `3`         |

## Computed Properties

| Name       | Type      | Description                                        |
| ---------- | --------- | -------------------------------------------------- |
| `getAlert` | `unknown` | **Dependencies:** `$store`, `location`, `maxAlert` |
| `hasAlert` | `unknown` | **Dependencies:** `getAlert`                       |

## Methods

### moment()

**Syntax**

```typescript
moment(DateTime: unknown): void
```

### registerLocation()

**Syntax**

```typescript
registerLocation(): void
```

