# vLabelValue

## Slots

| Name      | Description |
| --------- | ----------- |
| `default` | &nbsp;      |

## Props

| Name             | Type                     | Description | Default     |
| ---------------- | ------------------------ | ----------- | ----------- |
| `minimum`        | `String` &#124; `Number` |             | `null`      |
| `maximum`        | `String` &#124; `Number` |             | `null`      |
| `normal`         | `String` &#124; `Array`  |             | `null`      |
| `normal-color`   | `String`                 |             | `undefined` |
| `abnormal-color` | `String`                 |             | `"red"`     |
| `label`          | `String`                 |             | `null`      |
| `append`         | `String`                 |             | `null`      |

## Data

| Name          | Type      | Description | Initial value |
| ------------- | --------- | ----------- | ------------- |
| `contentData` | `unknown` |             | `null`        |

## Computed Properties

| Name          | Type      | Description                                                                                                      |
| ------------- | --------- | ---------------------------------------------------------------------------------------------------------------- |
| `colorClass`  | `unknown` | **Dependencies:** `contentData`, `normal`, `normalValue`, `abnormalColor`, `minValue`, `maxValue`, `normalColor` |
| `minValue`    | `unknown` | **Dependencies:** `minimum`                                                                                      |
| `maxValue`    | `unknown` | **Dependencies:** `maximum`                                                                                      |
| `normalValue` | `unknown` | **Dependencies:** `normal`                                                                                       |
