import ExpenseForm from './ExpenseForm'
import classes from './ExpenseLayout.module.css'

const ExpenseLayout=()=>{
    return(
        <div className={classes['for-container']}>
            <div className={classes.half}>
                <ExpenseForm />
            </div>
            <div className={classes.half}>

            </div>
        </div>
    )
}

export default ExpenseLayout