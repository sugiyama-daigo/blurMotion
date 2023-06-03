# blurMotion.js
blurMotion.js work for javascript animation. 

## DEMO
[DEMO 001](https://www.decent-works.net/blurmotionjs/demo/demo_001/demo_001.html)
[DEMO 002](https://www.decent-works.net/blurmotionjs/demo/demo_002/demo_002.html)
[DEMO 003](https://www.decent-works.net/blurmotionjs/demo/demo_003/demo_003.html)
[DEMO 004](https://www.decent-works.net/blurmotionjs/demo/demo_004/demo_004.html)
[DEMO 005](https://www.decent-works.net/blurmotionjs/demo/demo_005/demo_005.html)

## Usage
Download blurMotion.js files and import setting to HTML head element.
jQuery is set up the same way.

```
<script src="jquery-xxx.min.js"></script>
<script src="blurMotion.js"></script>
```

### Mark HTML elements for animation
Set the class name "bm" to the HTML element to be animated.
```
<p class="bm">Blur Animation Element</p>
```

### Set Animation Contents
Specify the content of the animation with class name.

| animation | class name |
----|---- 
| blur | blrng |
| hue | blhue |
| move | blmove |

### ■blur(blrng)
The set value of the blur is written the below described.
```
blrng_lowerLimitValue_upperLimitValue_currentValue_direction
```

| setting | description(value range) | Default Value |
----|---- 
| lowerLimitValue | Lower limit of blur | 0 |
| upperLimitValue | Upper limit of blur | 10 |
| currentValue | Current value of blur | 0 |
| direction | Direction of movement of blur values(0:Decrease in value, 1:Increase in value) | 1 |

#### Example
```
<p class="bm blrng_20_25_25_0">Animation Element</p>
```

### ■hue(blhue)
The set value of the hue is written the below described.
```
blhue_lowerLimitValue_upperLimitValue_currentValue_rangeOfIncAndDec_direction
```
| setting | description(value range) | Default Value
----|---- 
| lowerLimitValue | Lower limit of hue (1deg - 359deg) | 0deg |
| upperLimitValue | Upper limit of hue  (1deg - 360deg)| 360deg |
| currentValue | Current value of hue | 0 |
| rangeOfIncAndDec | Range of increase/decrease | 1 |
| direction | Direction of movement of hue values(0:Decrease in value, 1:Increase in value) | 1 |

The color that changes with changes in the Hue value of the blur is affected by the "color" set for the "element to animate".

You can check the "hue value and color change" of "specified color" from the link below.

[Hue Color](https://www.decent-works.net/blurmotionjs/hue_color/hue_color.html)

#### Example
```
<p class="bm blhue_0_100_50_2_1">Animation Element</p>
```

### ■move(blmove)
The set value of the move is written the below described.
```
blmove_lowerLimitValue_upperLimitValue_duration

| setting | description(value range) | Default Value
----|---- 
| lowerLimitValue | Lower limit of move (0% - 100%) | 0 |
| upperLimitValue | Upper limit of move  (0% - 100%)| 100 |
| duration | Animation Time milli second | 5000 |

#### Example
```
<p class="bm blmove_10_100_10000">Animation Element</p>
```


###CSS settings
Set "position:relative" to the "parent element" of the element to which blur is applied.

For example, the following code sets 
```
position: relative
```
to "blur-wrap" in the "id attribute".
```
<div id="blur-wrap">
    <div id="blur-element">
</div>
```

The element whose "id attribute" is "blur-element" is the element to which "blur" is applied, and 
```
position: absolute
```
is set for this element.

Moving an element must be done with respect to its parent element.