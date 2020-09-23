import * as React from 'react'
import styles from './styles.module.less'

interface Props {
  text: string
}

export const ExampleComponent = ({ text }: Props) => {
  return <div className={styles.title}>Example Component: <span className="text">{text}</span></div>
}
