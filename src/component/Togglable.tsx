import { useImperativeHandle, useState , forwardRef} from "react"
import PropTypes from 'prop-types'
interface Props {
    buttonLabel:string;
    children:React.ReactNode
}
const Togglable =forwardRef((props:Props,refs) =>{
    const { buttonLabel, children} = props
    const [visible,setVisible] = useState(false)

    const hideWhenVisible={
        display:visible ? 'none' : ''
    }
    const showWhenVisible={
        display:visible ? "" : 'none'
    }

    const toggleVisibility=()=> setVisible(!visible)

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })
  return (
    <div>
        <div style={hideWhenVisible}>
            <button onClick={toggleVisibility}>{buttonLabel}</button>
        </div>
        <div style={showWhenVisible} className="togglableContent">
            {children}
            <button onClick={toggleVisibility}>cancel</button>
        </div>
    </div>
  )
})


Togglable.propTypes = {
    buttonLabel:PropTypes.string.isRequired
}
export default Togglable
