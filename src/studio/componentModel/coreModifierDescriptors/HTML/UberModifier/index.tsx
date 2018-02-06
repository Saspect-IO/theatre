import {IModifierDescriptor} from '$studio/componentModel/types'
import commonStylesPrototype from '$src/studio/componentModel/coreModifierDescriptors/HTML/SetCustomStyle/commonStylesPrototype'
import dict from '$src/shared/DataVerse/atoms/dict'
import withDeps from '$src/shared/DataVerse/derivations/withDeps'
import AbstractDerivation from '$src/shared/DataVerse/derivations/AbstractDerivation'

const numeralize = (
  vD: AbstractDerivation<undefined | null | string | number>,
) => {
  const v = vD.getValue()
  if (typeof v === 'number') {
    return String(v)
  } else if (typeof v === 'string') {
    if (parseFloat(v) === parseFloat(v)) {
      return v
    } else {
      return '0'
    }
  } else {
    return '0'
  }
}

const getClass = (propsP, baseClass) => {
  return baseClass.extend(commonStylesPrototype).extend({
    reifiedStyles(self) {
      return self.propFromSuper('reifiedStyles').flatMap(reifiedStyles => {
        const translateXP = propsP.prop('translationX')
        const translateYP = propsP.prop('translationY')
        const translateZP = propsP.prop('translationZ')

        const scaleXP = propsP.prop('scaleX')
        const scaleYP = propsP.prop('scaleY')
        const scaleZP = propsP.prop('scaleZ')

        const opacityP = propsP.prop('opacity')

        return withDeps(
          {
            translateXP,
            translateYP,
            translateZP,
            scaleXP,
            scaleYP,
            scaleZP,
            opacityP,
          },
          deps => {
            console.log(deps)

            const d = dict({
              transform: `translate3d(${numeralize(
                translateXP,
              )}px, ${numeralize(translateYP)}px, ${numeralize(
                translateZP,
              )}px) scale3d(${numeralize(scaleXP)}, ${numeralize(
                scaleYP,
              )}, ${numeralize(scaleZP)})`,
              opacity: numeralize(opacityP),
            })

            return reifiedStyles.extend(d.derivedDict())
          },
        )
      })
    },
  })
}

const descriptor: IModifierDescriptor = {
  id: 'TheaterJS/Core/HTML/UberModifier',
  getClass,
}

export default descriptor
