# vUserCheckDialog

## Props

| Name                  | Type      | Description | Default |
| --------------------- | --------- | ----------- | ------- |
| `must-login`          | `Boolean` |             | `false` |
| `verify-current-user` | `Boolean` |             | `false` |

## Data

| Name        | Type     | Description | Initial value |
| ----------- | -------- | ----------- | ------------- |
| `loginData` | `object` |             | `{}`          |

## Events

| Name     | Description                                               |
| -------- | --------------------------------------------------------- |
| `result` | <br/>**Arguments**<br/><ul><li>**`value: any`**</li></ul> |

## Methods

### login()

**Syntax**

```typescript
login(): void
```

### choose()

**Syntax**

```typescript
choose(value: unknown): void
```

### reset()

**Syntax**

```typescript
reset(): void
```
