function dataFormat(elements:Array<any>,mapDetail=false){
    let dataList= []
    for(let i=0;i<elements.length;i++){
        let str:string = elements[i].label
        let area:string = str.split(' ')[0];
        switch (area) {
            case 'Anhui':{area='安徽'}//1
                break;
            case 'Beijing':{area='北京'}//2
                break;
            case 'Fujian':{area='福建'}//3
                break;
            case 'Gansu':{area='甘肃'}//4
                break;
            case 'Guangdong':{area='广东'}//5
                break;
            case 'Guangxi':{area='广西'}//6
                break;
            case 'Guizhou':{area='贵州'}//7
                break;
            case 'Hainan':{area='海南'}//8
                break;
            case 'Hebei':{area='河北'}//9
                break;
            case 'Henan':{area='河南'}//10
                break;
            case 'Heilongjiang':{area='黑龙江'}//11
                break;
            case 'Hubei':{area='湖北'}//12
                break;
            case 'Hunan':{area='湖南'}//13
                break;
            case 'Jilin':{area='吉林'}//14
                break;
            case 'Jiangsu':{area='江苏'}//15
                break;
            case 'Jiangxi':{area='江西'}//16
                break;
            case 'Liaoning':{area='辽宁'}//17
                break;
            case 'Inner':{area='内蒙古'}//18
                break;
            case 'Ningxia':{area='宁夏'}//19
                break;
            case 'Qinghai':{area='青海'}//20
                break;
            case 'Shandong':{area='山东'}//21
                break;
            case 'Shanxi':{area='山西'}//22
                break;
            case 'Shaanxi':{area='陕西'}//23
                break;
            case 'Shanghai':{area='上海'}//24
                break;
            case 'Sichuan':{area='四川'}//25
                break;
            case 'Tianjing':{area='天津'}//26
                break;
            case 'Tibet':{area='西藏'}//27
                break;
            case 'Xinjiang':{area='新疆'}//28
                break;
            case 'Yunnan':{area='云南'}//29
                break;
            case 'Zhejiang':{area='浙江'}//30
                break;
            case 'Chongqing':{area='重庆'}//31
                break;
            case 'Macao':{area='澳门'}//32
                break;
            case 'Hong':{area='香港'}//33
                break;
            case 'Taiwan':{area='台湾'}//34
                break;
            default:{console.log('transfer err')}
                break;
        }
        if(mapDetail===true){
            dataList[i]={'label':area,'nb_visits':elements[i].nb_visits,'rate':`${elements[i].rate}%`}
        }else{
            dataList[i]={'name':area,'value':elements[i].nb_visits,'rate':elements[i].rate}
        }
    }
    const data = dataList;

    return data;
}

function titleTranslate(title:any){
    switch (title) {
        case 'nb_hits':
            return 'PV';
        case 'nb_uniq_visitors':
            return 'UV';
        case 'forwarding_number':
            return '转发数';
        case 'avg_time_on_page':
            return '平均时长';
        case 'bounce_rate':
            return '跳出率';
        case 'maplabel':
            return '城市';
        case 'mapnb_visits':
            return '访问数量';
        case 'maprate':
            return '占比';
        case 'barchartlabel':
            return '渠道名';
        case 'barchartnb_visits':
            return '访问数量';
        case 'promotelabel':
            return '渠道名';
        case 'promotenb_visits':
            return '访问数量';
        default:{console.log('transfer err')}
            return 'null';
    }
}

function compare(p:string){ 
    return function(m:any,n:any){
        var a = m[p];
        var b = n[p];
        return b - a; 
    }
}

export {dataFormat,titleTranslate,compare}