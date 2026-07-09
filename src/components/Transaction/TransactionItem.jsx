import "./TransactionItem.css";

function TransactionItem({title,category,amount,type,date}) {
  return (
    <div className="transaction-item">

   <div className="transaction-info">
    <h3>{title}</h3>
    <p>{category}</p>
   </div>

   <div className="transaction-meta">
    
    <h3 className={`transaction-amount-${type}`}>${amount.toLocaleString("tr-TR")}</h3>
    <p>{date}</p>

   </div>



    </div>
  )
}

export default TransactionItem