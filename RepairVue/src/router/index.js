import Vue from 'vue'
import Router from 'vue-router'

import Register from '@/components/Register';
import Login from "@/components/Login";
/*手机端*/
import CompanyWUYE from '@/components/CompanyWUYE'
import Index from '@/components/Property';
import WUYESelfEdit from '@/components/WUYESelfEdit'
import deviceEdit from "@/components/property/deviceManage/edit";
import deviceIndex from "@/components/property/deviceManage/index";
import deviceBlack from "@/components/property/deviceManage/black";
import deviceWarranty from "@/components/property/deviceManage/warranty";
import deviceXjPlan from "@/components/property/deviceManage/xjPlan";
import warrantyMes from "@/components/property/deviceManage/warrantyMes";
import complaintIndex from "@/components/property/complaintManage/index";
import repairMain from "@/components/property/complaintManage/repairMain";
import repairMain1 from "@/components/property/deviceManage/repairMain";
import contractEdit from "@/components/property/contractManage/edit";
import contractSelect from "@/components/property/contractManage/select";
import contractBlack from "@/components/property/contractManage/black";
import announceEdit from "@/components/property/announceManage/edit";
import announceBlack from "@/components/property/announceManage/black";
import announceIndex from "@/components/property/announceManage/index";
import demandEdit from "@/components/property/demandManage/edit";
import demandBlack from "@/components/property/demandManage/black";
import demandIndex from "@/components/property/demandManage/index";
import quoteSelect from "@/components/property/demandManage/select";
import patrolReminderIndex from "@/components/property/PatrolReminder/index";
import editSubAccount from "@/components/property/editSubAccount";
import GenerateSubAccount from "@/components/property/GenerateSubAccount";
import subAccount from "@/components/property/subAccount";
import contractIndex from "@/components/property/contractManage/index";
import checkHistoryPH from "@/components/property/countCenter/checkHistory";
import countPH from "@/components/property/countCenter/count";
import equipmentPH from "@/components/property/countCenter/equipment";
import faultPH from "@/components/property/countCenter/fault";
import replacePartsPH from "@/components/property/countCenter/replaceParts";
import PatrolReminderIndex from "@/components/property/PatrolReminder/index";
import PatrolReminderSelect from "@/components/property/PatrolReminder/select";
import PatrolReminderBlack from "@/components/property/PatrolReminder/black";
import Black from '@/components/property/black'

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.js';
import Company from "@/components/Company";
import CompanyA from '@/components/companyA'
import WithWe from '@/components/withWe'
import Worker from '@/components/Worker'
import ManagePro from "@/components/managePro";
import ProCon from '@/components/proCon'
import SelfEdit from '@/components/selfEdit'
import PartsManage from '@/components/PartsManage/PartsManage'
import PartsAddMessage from '@/components/PartsManage/PartsAddMessage'
// import PartsAddNum from '@/components/PartsManage/PartsAddNum'
import PartsReq from '@/components/PartsManage/PartsReq'
import PartsReq1 from '@/components/PartsManage/PartsReq1'
import PartsReq2 from '@/components/PartsManage/PartsReq2'
import PartsReqAll from '@/components/PartsManage/PartsReqAll'
import SelectAll from '@/components/PartsManage/SelectAll'
import ShowPartsMessage from '@/components/PartsManage/showPartsMessage'
import FixerManage from '@/components/FixerManage/fixerManage'
import ShowFixerReqs from '@/components/FixerManage/showFixerReqs'
import EditFixerMessage from '@/components/FixerManage/editFixerMessage'
import SendTask from '@/components/FixerManage/sendTask'
import EditFixerM from '@/components/FixerManage/editFixerM'
import RepairList from '@/components/RepairList/RepairList'
import NoRepair from '@/components/RepairList/NoRepair'
import Repairing from '@/components/RepairList/Repairing'
import FinishList from '@/components/RepairList/FinishList'
import Bidding from '@/components/Bidding/bidding'
import Notice from '@/components/Notice/notice'
import AddNotice from '@/components/Notice/addNotice'
import ShowAllRepair from '@/components/RepairList/ShowAllRepair'
import RepairListFixer from '@/components/RepairListFixer/repairListFixer'
import Sign from '@/components/RepairListFixer/sign'
import Saoma from '@/components/RepairListFixer/saoma'
import EditFixerSelf from '@/components/RepairListFixer/editFixerSelf'
import WaitListFixer from '@/components/RepairListFixer/waitListFixer'
import ListHistory from '@/components/RepairListFixer/listHistory'
import SelectParts from '@/components/RepairListFixer/selectParts'
import BackMessage from '@/components/RepairListFixer/backMessage'
import SelectWy from "@/components/checkPlan/selectWy"
import SelectAllEquipment from '@/components/checkPlan/selectAllEquipment'
import SelectEquip from "@/components/checkPlan/selectEquip"
import HistoryList from "@/components/checkPlan/historyList"
import SubmitPlan from '@/components/checkPlan/submitPlan'
import PayForMember from '@/components/payForMember'
import Polling from '@/components/RepairListFixer/polling'
import SubmitPoll from '@/components/RepairListFixer/submitPoll'
import Count from '@/components/countCenter/count'
import Fault from '@/components/countCenter/fault'
import CheckHistory from '@/components/countCenter/checkHistory'
import ReplaceParts from '@/components/countCenter/replaceParts'
import Equipment from '@/components/countCenter/equipment'
import BackMessageWBQY from '@/components/backMessageWBQY'
Vue.use(Router);
export default new Router({
routes: [
    {
      path: '/',
      // name: 'Login',
      redirect: {
        name: "Login"
      },
      // 登陆权限包括三个端口的权限，其实就是和数组里的元素比对，相同说明是同一权限的，不同说明是跨权限的。
      meta:['wbqy','wxg','wy']

    },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:['wbqy','wxg','wy']

  },
    {
      path: '/register',
      name: 'register',
      component: Register
    },

  {
    path: '/CompanyWUYE',
    component: CompanyWUYE,
    meta:['wy'],
    // 嵌套路由
    children: [
      //   // 重定向，默认打开页面是companyA  (注意：当某个路由有子集路由的时候，这时候父级路由需要一个默认的路由，所以父级路由不能定义name属性。
      // 解决办法：即去除父级的name属性即可。)
      {
        path: "/",
        redirect: {
          name: "index"
        }
      },
      {
        path: "/index",
        name: "index",
        component: Index,
        meta:['wy'],
      },
      {
        path: '/WUYESelfEdit',
        name: 'WUYESelfEdit',
        component: WUYESelfEdit,
        meta:['wy'],

      }
    ]
  },
    {
      path:'/equipment/edit/:elementId',
      name:'elementEdit',
      component:deviceEdit,
      meta:['wy'],

    },
    {
      path:'/equipment/warrantyMes/:elementId',
      name:'warrantyMes',
      component:warrantyMes,
      meta:['wy'],

    },
    {
      path:'/equipment/index',
      name:'equipmentIndex',
      component:deviceIndex,
      meta:['wy'],

    },
    {
      path:'/equipment/xjPlan/:elementId',
      name:'equipmentXjPlan',
      component:deviceXjPlan,
      meta:['wy'],

    },
    {
      path:'/equipment/warranty',
      name:'warrantyIndex',
      component:deviceWarranty,
      meta:['wy'],

    },
    {
      path:'/contract/edit/:contractId',
      name:'contractEdit',
      component:contractEdit,
      meta:['wy'],

    },
    {
      path:'/contract/index',
      name:'contractIndex',
      component:contractIndex,
      meta:['wy'],

    },
    {
      path:'/contract/select/:contractId',
      name:'contractSelect',
      component:contractSelect,
      meta:['wy'],

    },
    {
      path:'/announce/edit/:announceId',
      name:'announceEdit',
      component:announceEdit,
      meta:['wy'],

    },
    {
      path:'/announce/index',
      name:'announceIndex',
      component:announceIndex,
      meta:['wy'],

    },
    {
      path:'/demand/edit/:demandId',
      name:'demandEdit',
      component:demandEdit,
      meta:['wy'],

    },
    {
      path:'/quoteSelect/:quoteId',
      name:'quoteSelect',
      component:quoteSelect,
      meta:['wy'],

    },
    {
      path:'/demand/index',
      name:'demandIndex',
      component:demandIndex,
      meta:['wy'],

    },
    {
      path:'/complaint/repair/:repairId',
      name:'repair',
      component:repairMain,
      meta:['wy'],

    },
    {
      path:'/repairManage/repair/:repairId',
      name:'repair1',
      component:repairMain1,
      meta:['wy'],

    },
    {
      path:'/complaint/index',
      name:'complaintIndex',
      component:complaintIndex,
      meta:['wy'],
    },
    {
      path:'/patrolReminder/index',
      name:'patrolReminderIndex',
      component:patrolReminderIndex,
      meta:['wy'],

    },
    {
      path: '/deviceBlack',
      name: 'deviceBlack',
      component: deviceBlack,
      meta:['wy'],

    },
    {
      path: '/demandBlack',
      name: 'demandBlack',
      component: demandBlack,
      meta:['wy'],

    },
    {
      path: '/PatrolReminderBlack',
      name: 'PatrolReminderBlack',
      component: PatrolReminderBlack,
      meta:['wy'],

    },
    {
      path: '/contractBlack',
      name: 'contractBlack',
      component: contractBlack,
      meta:['wy'],

    },
    {
      path: '/announceBlack',
      name: 'announceBlack',
      component: announceBlack,
      meta:['wy'],

    },
    {
      path: '/editSubAccount/:subAccountId',
      name: 'editSubAccount',
      component: editSubAccount,
      meta:['wy'],

    },
    {
      path: '/GenerateSubAccount',
      name: 'GenerateSubAccount',
      component: GenerateSubAccount,
      meta:['wy'],

    },
    {
      path: '/subAccount/:subAccountId',
      name: 'subAccount',
      component: subAccount,
      meta:['wy'],

    },
  {
    path: "/countCenterPH/count",
    name: 'countPH',
    component: countPH,
    meta:['wy'],

    children: [
      {
        path: '/countCenterPH/fault',
        name: 'faultPH',
        component: faultPH,
        meta:['wy'],

      },
      {
        path: '/countCenterPH/checkHistory',
        name: 'checkHistoryPH',
        component: checkHistoryPH,
        meta:['wy'],

      },
      {
        path: '/countCenterPH/replaceParts',
        name: 'replacePartsPH',
        component: replacePartsPH,
        meta:['wy'],

      }
    ]},
      {
        path: '/countCenterPH/equipment',
        name: 'equipmentPH',
        component: equipmentPH,
        meta:['wy'],

      },
      {
        path: '/PatrolReminder/index',
        name: 'PatrolReminderIndex',
        component: PatrolReminderIndex,
        meta:['wy'],

      },
      {
        path: '/PatrolReminder/select/:xjgdId',
        name: 'PatrolReminderSelect',
        component: PatrolReminderSelect,
        meta:['wy'],

      },
      {
        path: '/property/black',
        name: 'black',
        component: Black,
        meta:['wy'],

      },

      {
        path: '/company',
        // name: 'company',

        component: Company,
        meta:['wbqy'],

        // 嵌套路由
        children: [
          //   // 重定向，默认打开页面是companyA  (注意：当某个路由有子集路由的时候，这时候父级路由需要一个默认的路由，所以父级路由不能定义name属性。
          // 解决办法：即去除父级的name属性即可。)
          {
            path: "/",
            redirect: {
              name: "companyA"
            }
          },
          {
            path: "/companyA",
            name: "companyA",
            component: CompanyA,
            meta:['wbqy']

          },
          {
            path: "/selfEdit",
            name: "selfEdit",
            component: SelfEdit,
            meta:['wbqy']

          }
        ]
      },
      {
        path: "/withWe",
        name: "withWe",
        component: WithWe,
        meta:['wy','wbqy']

      },
      {
        path: '/worker',
        name: 'worker',
        component: Worker,
        meta:['wxg']
      },
      {
        path: '/managePro',
        name: 'managePro',
        component: ManagePro,
        meta:['wbqy']

      },
      {
        path: '/proCon',
        name: 'proCon',
        component: ProCon,
        meta:['wbqy']

      },
      {
        path: '/partsManage',
        // name:'partsManage',
        component: PartsManage,
        meta:['wbqy'],

        // 嵌套路由
        children: [
          {
            // 重定向，默认打开页面是PartsAddMessage
            path: '/',
            redirect: {
              name: "partsAddMessage"
            },
            meta:['wbqy']

          },
          {
            path: "/partsManage/partsAddMessage",
            name: "partsAddMessage",
            component: PartsAddMessage,
            meta:['wbqy']

          },
          // {
          //   path: "/partsManage/partsAddNum",
          //   name: "partsAddNum",
          //   component: PartsAddNum
          // },
          {
            path: "/partsManage/partsReq",
            // name: "partsReq",
            component: PartsReq,
            meta:['wbqy'],

            children: [
              {
                // 重定向，默认打开页面是showFixerReqs
                path: '/',
                redirect: {
                  name: "partsReq1"
                }
              },
              {
                path: "/partsManage/partsReq1",
                name: "partsReq1",
                component: PartsReq1,
                meta:['wbqy']

              },
              {
                path: "/partsManage/partsReq2",
                name: "partsReq2",
                component: PartsReq2,
                meta:['wbqy']

              },
            ]
          },
          {
            path: "/partsManage/partsReqAll",
            name: "partsReqAll",
            component: PartsReqAll,
            meta:['wbqy']

          }
        ]
      },
      {
        path: "/selectAll",
        name: "selectAll",
        component: SelectAll,
        meta:['wbqy']

      },
      {
        path: "/showPartsMessage",
        name: "showPartsMessage",
        component: ShowPartsMessage,
        meta:['wbqy']

      },
      {
        path: "/fixerManage",
        // name:"fixerManage",
        component: FixerManage,
        meta:['wbqy'],
        // 嵌套路由
        children: [
          {
            // 重定向，默认打开页面是showFixerReqs
            path: '/',
            redirect: {
              name: "showFixerReqs"
            }
          },
          {
            path: "/fixerManage/showFixerReqs",
            name: "showFixerReqs",
            component: ShowFixerReqs,
            meta:['wbqy']
          },
          {
            path: "/fixerManage/editFixerMessage",
            name: "editFixerMessage",
            component: EditFixerMessage,
            meta:['wbqy']

          },
          {
            path: "/fixerManage/sendTask",
            name: "sendTask",
            component: SendTask,
            meta:['wbqy']

          }
        ]
      },
      {
        path: "/editFixerM",
        name: "editFixerM",
        component: EditFixerM,
        meta:['wbqy']

      },
      {
        path: "/repairList",
        // name:"repairList",
        component: RepairList,
        meta:['wbqy'],
        children: [
          {
            // 重定向，默认打开页面是noRepair
            path: '/',
            redirect: {
              name: "noRepair"
            }
          },
          {
            path: "/repairList/noRepair",
            name: "noRepair",
            component: NoRepair,
            meta:['wbqy']

          },
          {
            path: "/repairList/repairing",
            name: "repairing",
            component: Repairing,
            meta:['wbqy']

          },
          {
            path: "/repairList/finishList",
            name: "finishList",
            component: FinishList,
            meta:['wbqy']

          },
          {
            path: "/repairList/showAllRepair",
            name: "showAllRepair",
            component: ShowAllRepair,
            meta:['wbqy']

          }
        ]
      },
      {
        path: "/bidding",
        name: "bidding",
        component: Bidding,
        meta:['wbqy']

      },
      {
        path: "/notice",
        name: "notice",
        component: Notice,
        meta:['wbqy']

      },
      {
        path: "/addNotice",
        name: "addNotice",
        component: AddNotice,
        meta:['wbqy']

      },
      {
        path: "/RepairListFixer/repairListFixer",
        name: "repairListFixer",
        component: RepairListFixer,
        meta:['wxg']

      },
      {
        path: "/RepairListFixer/sign",
        name: "sign",
        component: Sign,
        meta:['wxg']


      },
      {
        path: "/RepairListFixer/saoma",
        name: "saoma",
        component: Saoma,
        meta:['wxg']


      },
      {
        path: "/RepairListFixer/editFixerSelf",
        name: "editFixerSelf",
        component: EditFixerSelf,
        meta:['wxg']

      },
      {
        path: "/RepairListFixer/waitListFixer",
        name: "waitListFixer",
        component: WaitListFixer,
        meta:['wxg']

      },
      {
        path: "/RepairListFixer/listHistory",
        name: "listHistory",
        component: ListHistory,
        meta:['wxg']

      },
      {
        path: "/RepairListFixer/selectParts",
        name: "selectParts",
        component: SelectParts,
        meta:['wxg']

      },
      {
        path: "/RepairListFixer/backMessage",
        name: "backMessage",
        component: BackMessage,
        meta:['wxg']

      },
      {
        path: "/RepairListFixer/polling",
        name: "polling",
        component: Polling,
        meta:['wxg']

      },
      {
        path: "/RepairListFixer/submitPoll",
        name: "submitPoll",
        component: SubmitPoll,
        meta:['wxg']

      },
      {
        path: "/checkPlan/selectAllEquipment",
        name: "selectAllEquipment",
        component: SelectAllEquipment,
        meta:['wbqy']

      },
  {
    path: "/checkPlan/selectWy",
    name: "selectWy",
    component: SelectWy,
    meta:['wbqy']


  },{
    path: "/checkPlan/selectEquip",
    name: "selectEquip",
    component: SelectEquip,
    meta:['wbqy']


  },
      {
        path: "/checkPlan/submitPlan",
        name: "submitPlan",
        component: SubmitPlan,
        meta:['wbqy']


      },
  {
    path: "/checkPlan/historyList",
    name: "historyList",
    component: HistoryList,
    meta:['wbqy']


  },
      {
        path: "/payForMember",
        name: "payForMember",
        component: PayForMember,
        meta:['wy','wbqy']


      },
      {
        path: "/countCenter/count",
        name: 'count',
        component: Count,
        meta:['wbqy'],

        children: [
          // {
          //   path:'/',
          //   redirect:{
          //     name:'fault'
          //   }
          // },
          {
            path: '/countCenter/fault',
            name: 'fault',
            component: Fault,
            meta:['wbqy']


          },
          {
            path: '/countCenter/checkHistory',
            name: 'checkHistory',
            component: CheckHistory,
            meta:['wbqy']


          },
          {
            path: '/countCenter/replaceParts',
            name: 'replaceParts',
            component: ReplaceParts,
            meta:['wbqy']


          }
        ]
      },
      {
        path: '/countCenter/equipment',
        name: 'equipment',
        component: Equipment,
        meta:['wbqy']


      },
      {
        path: '/backMessageWBQY',
        name: 'backMessageWBQY',
        component: BackMessageWBQY,
        meta:['wbqy']


      }

  ]})
