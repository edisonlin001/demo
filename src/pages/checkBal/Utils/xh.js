import API from "../../../plugins/axiosYPD"



async function getIenuleSelect(tenant_code,task_id,status){
    var result = await API({
        url:"/yipandian/getInventory?tenant_code="+tenant_code+"&task_id="+task_id+"&status="+status,
        method:"get"
    });
    
    return result.data.data
}
async function getCardTableData(tenant_code,row){
    var result = await API({
        url:"/yipandian/getCardByInventoryId?tenant_code="+tenant_code,
        method:"post",
        data:{"tenant_code":tenant_code,"inventory":row}
    });
    
    return result.data.data;
}


async function getInventoryTask(tenant_code){
    var result = await API({
        url:"/yipandian/getInventoryTask?tenant_code="+tenant_code,
        method:"get"
    });
    return result.data.data
}


export default{
    getIenuleSelect,
    getCardTableData,
    getInventoryTask
}