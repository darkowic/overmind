import { h, useState, useRef } from 'overmind-components'
import * as ReactImage from '../../images/react.png'
import * as VueImage from '../../images/vue.png'
import * as AngularImage from '../../images/angular.png'
import * as OvermindImage from '../../images/overmind.png'
import * as TsImage from '../../images/ts.png'
import * as TsImageGrayscale from '../../images/ts-grayscale.png'
import Icon from '../Icon'
import { Component } from '../../app'
import * as styles from './styles'
import { css } from 'emotion'

const ViewSelector: Component = ({ state, actions }) => {
  const [isOpen, setOpen] = useState(false)
  const selectorRef = useRef()

  function onSelectorClick() {
    setOpen(true)

    const onDocumentClick = function() {
      document.removeEventListener('click', onDocumentClick)
      setOpen(false)
    }
    document.addEventListener('click', onDocumentClick)
  }

  const options = {
    components: (
      <div className={styles.viewOption}>
        <img src={OvermindImage} width={25} />
        Components
      </div>
    ),
    react: (
      <div className={styles.viewOption}>
        <img src={ReactImage} width={25} />
        React
      </div>
    ),
    vue: (
      <div className={styles.viewOption}>
        <img src={VueImage} width={25} />
        Vue
      </div>
    ),
    angular: (
      <div className={styles.viewOption}>
        <img src={AngularImage} width={25} />
        Angular
      </div>
    ),
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.tsImageWrapper} onClick={actions.toggleTypescript}>
        {state.typescript ? (
          <img className={styles.image} src={TsImage} width="20" height="20" />
        ) : (
          <img
            className={css(styles.image, styles.grayscale)}
            src={TsImageGrayscale}
            width="20"
            height="20"
          />
        )}
      </div>
      <div
        ref={selectorRef}
        onClick={onSelectorClick}
        className={css(styles.selector, isOpen && styles.selectorOpen)}
      >
        {options[state.theme]}
        <span className={styles.chevron}>
          <Icon>chevron-down</Icon>
        </span>
      </div>
      {isOpen ? (
        <div className={styles.dropdown}>
          {Object.keys(options).map((viewTheme) => (
            <div
              key={viewTheme}
              className={styles.option}
              onClick={() => actions.selectTheme(viewTheme)}
            >
              {options[viewTheme]}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default ViewSelector
