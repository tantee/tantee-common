# vActionDialog

## Slots

| Name             | Description |
| ---------------- | ----------- |
| `activateButton` |             |
| `title`          |             |
| `formError`      |             |
| `default`        | &nbsp;      |

## Props

| Name                   | Type      | Description | Default     |
| ---------------------- | --------- | ----------- | ----------- |
| `max-width`            | `String`  |             | `"80vw"`    |
| `max-height`           | `String`  |             | `"80vh"`    |
| `form-title`           | `String`  |             | `null`      |
| `object`               | `Object`  |             |             |
| `is-show-dialog`       | `Boolean` |             | `false`     |
| `initial-data`         | `Object`  |             | `undefined` |
| `fullscreen`           | `Boolean` |             | `false`     |
| `save-caption`         | `String`  |             | `"Save"`    |
| `cancel-caption`       | `String`  |             | `"Cancel"`  |
| `hide-activate-button` | `Boolean` |             | `false`     |
| `activate-button-text` | `String`  |             | `"New"`     |
| `check-data-change`    | `Boolean` |             | `false`     |
| `disabled`             | `Boolean` |             | `false`     |

## Data

| Name         | Type      | Description | Initial value |
| ------------ | --------- | ----------- | ------------- |
| `formData`   | `object`  |             | `{}`          |
| `formErrors` | `array`   |             | `[]`          |
| `isShowing`  | `boolean` |             | `false`       |
| `isSaving`   | `boolean` |             | `false`       |

## Computed Properties

| Name           | Type      | Description                            |
| -------------- | --------- | -------------------------------------- |
| `isDataChange` | `unknown` | **Dependencies:** `formData`, `object` |

## Events

| Name            | Description                                                                                                                                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `saveData`      | <br/>**Arguments**<br/><ul><li>**`formData: any`**</li><li>**`{ form: this,done: function() { this.form.isSaving = false this.form.closeDialog() },error: function(errors){ this.form.isSaving = false this.form.formErrors = errors }}: object`**</li></ul> |
| `showingChange` | <br/>**Arguments**<br/><ul><li>**`newVal: any`**</li></ul>                                                                                                                                                                                                   |

## Methods

### onSaveData()

**Syntax**

```typescript
onSaveData(): void
```

### onOpening()

**Syntax**

```typescript
onOpening(): void
```

### closeDialog()

**Syntax**

```typescript
closeDialog(): void
```

### fillData()

**Syntax**

```typescript
fillData(item: unknown): void
```
