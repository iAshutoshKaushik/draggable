<template>
  <div>
    <h3>click on any section to see menu</h3>
    <div class="web_body">

      <b-modal id="sectionMenuModal" hide-header hide-footer>
        <div class="d-block text-center">
          <h2>Edit Section</h2>
          <hr>
          <div class="mx-1 my-2">
            <label>Add new section</label>
            <b-button class="mx-1 my-1" variant="primary" pill @click="addBtn()">Add</b-button>
            <hr>
          </div>
          <div class="mx-1 my-2">
          <label>Move Section</label>
            <b-button class="mx-1 my-1" variant="primary" pill @click="btnClickUp(index)">Up</b-button>
            <b-button class="mx-1 my-1" variant="primary" pill @click="btnClickDown(index)">Down</b-button>
            <hr>
          </div>
          <div class="mx-1 my-2">
            <label>Align Title</label>
            <b-button class="mx-1 my-1" variant="primary" pill @click="titleAlignLeft(index)">Align Left</b-button>
            <b-button class="mx-1 my-1" variant="primary" pill @click="titleAlignCenter(index)">Align Center</b-button>
            <b-button class="mx-1 my-1" variant="primary" pill @click="titleAlignRight(index)">Align Right</b-button>
          </div>
          <hr>
          <div class="mx-1 my-2">
            <label>Align Subtext</label>
            <b-button class="mx-1 my-1" variant="primary" pill @click="subTextLeft(index)">Align Left</b-button>
            <b-button class="mx-1 my-1" variant="primary" pill @click="subTextCenter(index)">Align Center</b-button>
            <b-button class="mx-1 my-1" variant="primary" pill @click="subTextRight(index)">Align Right</b-button>
          </div>
          <hr>
          <div class="mx-1 my-2">
            <label class="mx-1 my-1">Edit Title</label>
            <input type="text" placeholder="Type here" v-model="titleValue">
            <b-button class="mx-1 my-1" variant="primary" pill size="sm" @click="changeTitle(index)">Submit</b-button>
          </div>
          <div class="mx-1 my-2">
            <label class="mx-1 my-1">Edit subtitle</label>
            <input type="text" placeholder="Type here" v-model="subTitleValue">
            <b-button class="mx-1 my-1" variant="primary" pill size="sm" @click="changeSubTitle(index)">Submit</b-button>
          </div>
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('sectionMenuModal')">Close</b-button>
      </b-modal>

      <draggable
          v-model="sectionsArray"
          group="people"
          :sectionsArray="sectionsArray"
          @start="drag=true"
          @end="drag=false"
          :disabled="false">
        <div class="content_body" v-for="(element, index) in sectionsArray" :key="element.name" @click="openMenuModal(index)">
          <div>
            <div class="common_content" :style="element.bgColor">
              <div class="d-flex" :style="element.textAlign">
                <h1>{{element.name}}</h1>
              </div>
              <div class="d-flex" :style="element.subTextAlign">
                <h5>{{element.value}}</h5>
              </div>
            </div>
          </div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: "Draggable",
  components: {
    draggable,
  },
  data() {
    return{
      colors: {
        hex: '#194d33',
        hex8: '#194D33A8',
        hsl: {h: 150, s: 0.5, l: 0.2, a: 1},
        hsv: {h: 150, s: 0.66, v: 0.30, a: 1},
        rgba: {r: 25, g: 77, b: 51, a: 1},
        a: 1
      },
      sectionsArray:[
        {id: 1, name: "Navbar", value: "This is Navbar section",bgColor: {"background-color":'rgb(237, 178, 14)'}, textAlign: {"justify-content": 'center'}, subTextAlign: {"justify-content": 'center'}},
        {id: 2, name: "Banner", value: "This is Banner section", bgColor: {"background-color":'rgb(96, 189, 49)'}, textAlign: {"justify-content": 'center'}, subTextAlign: {"justify-content": 'center'}},
        {id: 3, name: "About", value: "This is About section", bgColor: {"background-color":'rgb(18,114,199)'}, textAlign: {"justify-content": 'center'}, subTextAlign: {"justify-content": 'center'}},
        {id: 4, name: "Service", value: "This is Services section", bgColor: {"background-color":'rgb(118,114,199)'}, textAlign: {"justify-content": 'center'}, subTextAlign: {"justify-content": 'center'}},
        {id: 5, name: "Location", value: "This is Location section", bgColor: {"background-color":'rgb(49, 189, 159)'}, textAlign: {"justify-content": 'center'}, subTextAlign: {"justify-content": 'center'}},
        {id: 6, name: "Footer", value: "This is Footer section", bgColor: {"background-color":'rgb(189, 49, 133)'}, textAlign: {"justify-content": 'center'}, subTextAlign: {"justify-content": 'center'}}
      ],
      newElement:[
        {id:7 ,name: "New Element", value:"this is new element", bgColor: {"background-color":'rgb(168, 115, 50)'}, textAlign: {"justify-content": 'center'}, subTextAlign: {"justify-content": 'center'}},
      ],
      elementId: '',
      titleValue: '',
      subTitleValue: '',
      randomColor: ''
    }
  },
  methods:{
    openMenuModal(index) {
      this.elementId = index
      this.$bvModal.show('sectionMenuModal')
    },
    btnClickUp() {
      if(this.elementId > 0){
        const next = this.sectionsArray[this.elementId - 1]
        const current = this.sectionsArray[this.elementId]
        this.sectionsArray[this.elementId] = next;
        this.sectionsArray[this.elementId-1] = current;
        this.sectionsArray = [...this.sectionsArray];
        console.log('Button up', this.sectionsArray,this.elementId);
        this.$bvModal.hide('sectionMenuModal')
      }
    },
    btnClickDown() {
      if(this.elementId < this.sectionsArray.length - 1){
        const previous = this.sectionsArray[this.elementId + 1]
        const current = this.sectionsArray[this.elementId]
        this.sectionsArray[this.elementId] = previous;
        this.sectionsArray[this.elementId+1] = current;
        this.sectionsArray = [...this.sectionsArray];
        console.log('Button up', this.sectionsArray, this.elementId);
        this.$bvModal.hide('sectionMenuModal')
      }
    },
    addBtn() {
      this.sectionsArray.push(...this.newElement)
      this.random_bg_color()
      console.log("this is color", this.randomColor)
      this.newElement = [{name: "New Element", value:"this is new element",id:this.sectionsArray.length+1 ,bgColor:{'background-color':this.randomColor}, textAlign: {"justify-content": 'center'}, subTextAlign: {"justify-content": 'center'}}]
      console.log("newelement empty", this.newElement)
      console.log("add here", this.sectionsArray)
      this.$bvModal.hide('sectionMenuModal')
    },
    changeTitle() {
      console.log(this.titleValue,"Here is title")
      this.sectionsArray[this.elementId].name = this.titleValue
      this.titleValue = ''
    },
    changeSubTitle() {
      console.log(this.subTitleValue,"Here is subtitle")
      this.sectionsArray[this.elementId].value = this.subTitleValue
      this.subTitleValue = ''
    },
    random_bg_color() {
      var x = Math.floor(Math.random() * 256);
      var y = Math.floor(Math.random() * 256);
      var z = Math.floor(Math.random() * 256);
      var bgColor = "rgb(" + x + "," + y + "," + z + ")";
      console.log(bgColor);
      this.randomColor = bgColor;
    },
    titleAlignLeft() {
      this.sectionsArray[this.elementId].textAlign = {
        "justify-content": 'left'
      }
    },
    titleAlignCenter() {
      this.sectionsArray[this.elementId].textAlign = {
        "justify-content": 'center'
      }
    },
    titleAlignRight() {
      this.sectionsArray[this.elementId].textAlign = {
        "justify-content": 'right'
      }
    },
    subTextLeft() {
      this.sectionsArray[this.elementId].subTextAlign = {
        "justify-content": 'left'
      }
    },
    subTextCenter() {
      this.sectionsArray[this.elementId].subTextAlign = {
        "justify-content": 'center'
      }
    },
    subTextRight() {
      this.sectionsArray[this.elementId].subTextAlign = {
        "justify-content": 'right'
      }
    },
  }
}
</script>

<style scoped>
.web_body {
  padding: 50px 0px 0px 0px;
  margin: 20px 0px 20px 0px;
}

.content_body {
  text-align: center;
  align-items: center;
  max-width: 2000px;
}
.common_content {
  align-items: center;
  text-align: center;
  max-width: 2000px;
  padding: 30px;
}
</style>