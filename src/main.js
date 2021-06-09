const $siteList = $('.siteList')
const $lastLi = $siteList.find(`li.last`)
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject||
[
    {logo:'A' , url:'https://www.acfun.cn'},
    {logo:'B' , url:'https://bilibili.com'},
    
]
const simplifyUrl=(url)=>{
    return url.replace(`https://`,'')
    .replace(`http://`,'')
    .replace(`www.`,'')
    .replace(/\/.*/,'')
}
const render =()=>{
    $siteList.find(`li:not(.last)`).remove() 
    hashMap.forEach((node,index) =>{
    console.log(index)
    const $li = $(`<li>
    
    <div class="site">
        <div class="logo">${node.logo}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
        <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-close"></use>
        </svg>
        </div> 
    </div>
    </li>`).insertBefore($lastLi)
    $li.on(`click`,()=>{
        window.open(node.url)
    })
    $li.on(`click`,`.close`,(e)=>{
        e.stopPropagation() //阻止冒泡
        console.log(hashMap)
        hashMap.splice(index,1)
        render()
    })
})
}
render()


{           /* <li>
                <a href="https://www.acfun.cn">
                <div class="site">
                    <div class="logo">A</div>
                    <div class="link">acfun.cn</div>
                </div>
            </a>
                
            </li>
            <li>
                <a href="https://bilibili.com">
                <div class="site">
                    <div class="logo">
                        <img src="./images/bilibili.png" alt="小电视">       </div>
                    <div class="link">bilibili.com</div>
                </div>
            </a>
                
            </li> */}
$(`.addButton`)
    .on(`click`,()=>{
     let url = window.prompt(`请问你要添加的网址是什么？`)
    if (url.indexOf('http')!==0) {
        url = 'https://' + url
    }
    

    hashMap.push({logo:simplifyUrl(url)[0].toUpperCase(),
        url: url})     //在哈希表中添加新的数组元素
       
    render()//渲染哈希
})
window.onbeforeunload = ()=>{
    
    const string = JSON.stringify (hashMap)
    localStorage.setItem('x',string)         //自动保存
}
$(document).on(`keypress`,(e)=>{
    const {key} = e
    for (let i=0;i<hashMap.length;i++)
       if (hashMap[i].logo.toLowerCase()===key) {
           window.open(hashMap[i].url)
       }
    })