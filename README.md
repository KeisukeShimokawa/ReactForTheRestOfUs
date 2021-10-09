# React For The Rest Of Us

## VSCode のスニペットの作り方

```bash
# Step 1. F1 > "snippet" > "javascriptreact.json"

# Step 2. snippet を作成する
#         https://snippet-generator.app

{
"React Component": {
		"prefix": "rc",
		"body": [
			"import React, { useEffect } from \"react\"",
			"",
			"function ${1:ComponentName}() {",
			"  return (",
			"    <>",
			"      $2",
			"    </>",
			"  )",
			"}",
			"",
			"export default ${1:ComponentName}"
		],
		"description": "React Component"
	}
}
```
