const getList = async function(page,pageSize,tabCurrent,dataName) {
    this.isLoading = true;
          this.hasMore = true;

          const data = await dataName();
          this.tabBar = data.data;          
          // 遍历数据
          for(let i in this.tabBar){
            this.tabBar[i].isSelected = parseInt(i) === tabCurrent;
            if(this.tabBar[i].isSelected){
              const notesContent = this.tabBar[i].content;

              if(page < notesContent.length){
                for (let j = page; j < page + pageSize; j++)
                {
                  if(notesContent[j])
                  this.notes.push(notesContent[j]);
                }

              }else{
                this.hasMore = false;
                this.isLoading = false;
                return;
              }
            }
        } 
        this.isLoading = false;
        this.page = page + pageSize;
}

export default getList;