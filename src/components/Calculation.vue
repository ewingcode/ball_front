<template>
    <div class='key-container'>
        <div class='keyboard' @click.stop='_handleKeyPress'>
            <div class='key-row'>
              <div class='key-cell' data-num='1'>1</div>
              <div class='key-cell' data-num='2'>2</div>
              <div class='key-cell' data-num='3'>3</div>
              <div class='key-cell add-cell' data-num='+100' >+100</div>
            </div>
            <div class='key-row'>
              <div class='key-cell' data-num='4'>4</div>
              <div class='key-cell' data-num='5'>5</div>
              <div class='key-cell' data-num='6'>6</div>
              <div class='key-cell add-cell' data-num='+200'>+200</div>
            </div>
            <div class='key-row'>
                <div class='key-cell' data-num='7'>7</div>
                <div class='key-cell' data-num='8'>8</div>
                <div class='key-cell' data-num='9'>9</div>
                <div class='key-cell add-cell' data-num='+500'>+500</div>
            </div>
          <div class='key-row'>
            <div class='key-cell' data-num=''></div>
            <div class='key-cell' data-num='0'>0</div>
            <div class='key-cell' data-num='D'>X</div>
            <div class='key-cell add-cell' data-num='+1000'>+1000</div>
          </div>
            <div class='key-row'>
              <div class='key-cell' data-num='C'>清空</div>
              <div class='key-cell' data-num='-1'>{{currentMoney}}</div>
              <div class='key-cell confirm' data-num='S'>
               投注 </div>
            </div>
          <!--  <div class='key-confirm' data-num='S'>确认</div>-->
        </div>
    </div>
</template>

<script>
    export default{

    	data(){
    		return{
            money : 0
            }
        },
      computed: {
        currentMoney: function () {
          this.$emit('getKeyBoardMoney', this.money);
          console.info("current:"+this.money);
          return this.money;
        }
      },
        methods : {
      reset(){
        this.money ='';
      },
			//处理按键
			_handleKeyPress(e) {
				let num = e.target.dataset.num;

				//不同按键处理逻辑
				// -1 代表无效按键，直接返回
				if (num == -1) return false;

				switch (String(num)) {
					//小数点
					case '.':
						this._handleDecimalPoint();
						break;
					//删除键
					case 'D':
						this._handleDeleteKey();
						break;
					//清空键
					case 'C':
						this._handleClearKey();
						break;
					//确认键
					case 'S':
						this._handleConfirmKey();
						break;
					default:
						this._handleNumberKey(num);
						break;
				}
			},
			//处理小数点函数
			_handleDecimalPoint() {
				//如果包含小数点，直接返回
				if (this.money.indexOf('.') > -1) return false;
				//如果小数点是第一位，补0
				if (!this.money.length)
					this.money = '0.';

				//如果不是，添加一个小数点
				else
					this.money = this.money + '.';

			},
			//处理删除键
			_handleDeleteKey() {
				let S = this.money.toString();
				//如果没有输入，直接返回
				if (!S.length) return false;
				//否则删除最后一个
				this.money = S.substring(0, S.length - 1);

			},
			//处理清空键
			_handleClearKey() {
				this.money = '';
			},
			//处理数字
			_handleNumberKey(num) {

				let S = this.money.toString();
        //如果有+号则执行累加算法
        if(num.indexOf('+') >  -1 ){
             num =  num.substring(1);
             this.money = Number(S)+ Number(num);
        }else{
          //没有小数点
          if (S == 0) {
            this.money = num;
          }else{
            this.money = S + num;
          }
				}

			},
			//提交
			_handleConfirmKey() {
				let S = this.money.toString();
				//未输入
				if (!S.length){
					alert( '您目前未输入!' )
					return false;
				}
				this.$emit('confirmEvent',S)
			 }
      }
    }
</script>

<style scoped>
    .key-container {
        width: 100%;
        display: flex;
        display : -webkit-flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    .input-box {
        font-size: 50px;
        font-weight: bold;
        height: 40px;
        border-bottom: 1px solid #aaa;
        padding: 10px 15px;
        text-align: right;
        width: 90%;
    }

    .keyboard {
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .keyboard .key-row {
        display: flex;
        display: -webkit-flex;
        position: relative;
        height: 45px;
        line-height: 45px;
    }

    .keyboard .key-row::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #d5d5d6;
        color: #d5d5d6;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }

    .keyboard .key-cell {
        flex: 1;
        -webkit-box-flex: 1;
        text-align: center;
        position: relative;
        background:#f3f3f3;
        border-top:#FFF solid 3px;
        border-right:#FFF solid 3px;
        color: #323232;
        font-size:20px;
    }

    .keyboard  .add-cell{
       background-color: rgba(0,0,0,0.48) ;
       color : #FFF;
       font-size:18px;
    }

    .keyboard  .confirm{
      background-color: #51a47d ;
      color : #FFF;
      font-size:18px;
      border-radius: 3px; /*css3属性IE不支持*/
    }


    .keyboard .key-cell::after {
        content: '';
        position: absolute;
        overflow: hidden;
        top: 0;
        right: 0;
        bottom: 0;
        height: 200%;
        border-right: 1px solid #d5d5d6;
        color: #d5d5d6;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }

    .keyboard .key-cell:nth-last-child(1)::after {
        border-right: 0;
    }

    .keyboard .disabled {
        background: rgba(0, 0, 0, 0.2);
    }


</style>
