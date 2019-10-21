import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home/Index'
// import BlockListPage from '@/components/blocks/List'
// import BlockDetailPage from '@/components/blocks/Detail'
// import OntIdListPage from '@/components/ontId/List'
// import OntIdDetailPage from '@/components/ontId/Detail'
// import AddressDetailPage from '@/components/addresses/Detail'
// import AddressList from '@/components/addresses/List'
// import TransactionList from '@/components/transactions/List'
// import TransactionDetail from '@/components/transactions/Detail'
// import ClaimDetailPage from '@/components/claim/Detail'
// import ClaimVerifyPage from '@/components/claim/Verify'
// import NodeStakeAuthorization from '@/components/nodes/List'
// import NodeTeamDetail from '@/components/nodes/Detail'
// import ContractList from '@/components/contracts/List'
// import ContractDetail from '@/components/contracts/Detail'
// import TokenList from '@/components/tokens/List'
// import TokenDetail from '@/components/tokens/Detail'
// import StatisticsTable from '@/components/statistics/Table'
// import ContractForm from '@/components/form/ContractForm'

// const Home = () => import('@/components/home/Index')
const BlockListPage = () => import('@/components/blocks/List')
const BlockDetailPage = () => import('@/components/blocks/Detail')
const OntIdListPage = () => import('@/components/ontId/List')
const OntIdDetailPage = () => import('@/components/ontId/Detail')
const AddressDetailPage = () => import('@/components/addresses/Detail')
const AddressList = () => import('@/components/addresses/List')
const TransactionList = () => import('@/components/transactions/List')
const TransactionDetail = () => import('@/components/transactions/Detail')
const ContractList = () => import('@/components/contracts/List')
const ContractDetail = () => import('@/components/contracts/Detail')
const TokenList = () => import('@/components/tokens/List')
const TokenDetail = () => import('@/components/tokens/Detail')
const StatisticsTable = () => import('@/components/statistics/Table')
const ContractForm = () => import('@/components/form/ContractForm')

Vue.use(Router);

let routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blocks/:pageSize/:pageNumber',
    name: 'blockListDetail',
    component: BlockListPage
  },
  {
    path: '/block/:param',
    name: 'blockDetail',
    component: BlockDetailPage
  },
  {
    path: '/blocks/:pageSize/:pageNumber/:net',
    name: 'blockListDetailTest',
    component: BlockListPage
  },
  {
    path: '/block/:param/:net',
    name: 'blockDetailTest',
    component: BlockDetailPage
  },
  {
    path: '/onyxidlist/:pageSize/:pageNumber',
    name: 'OntIdListDetail',
    component: OntIdListPage
  },
  {
    path: '/onyxid/:ontid/:pageSize/:pageNumber',
    name: 'OntIdDetail',
    component: OntIdDetailPage
  },
  {
    path: '/onyxid/:ontid',
    name: 'OntIdDetailWithoutPage',
    component: OntIdDetailPage
  },
  {
    path: '/address/:address/:assetName/:pageSize/:pageNumber',
    name: 'AddressDetail',
    component: AddressDetailPage
  },
  {
    path: '/address/:address/:pageSize/:pageNumber',
    name: 'AddressDetail',
    component: AddressDetailPage
  },
  {
    path: '/address/:address/',
    name: 'AddressDetailwithoutpage',
    component: AddressDetailPage
  },
  {
    path: '/addresses/:token/:pageSize/:pageNumber',
    name: 'addressList',
    component: AddressList
  },
  {
    path: '/addresses/:token/:pageSize/:pageNumber/:net',
    name: 'addressListTest',
    component: AddressList
  },
  {
    path: '/transactions/:pageSize/:pageNumber',
    name: 'TransactionList',
    component: TransactionList
  },
  {
    path: '/transactions/:pageSize/:pageNumber/:net',
    name: 'TransactionListTest',
    component: TransactionList
  },
  {
    path: '/transaction/:tx_hash',
    name: 'TransactionDetail',
    component: TransactionDetail
  },
  {
    path: '/transaction/:tx_hash/:net',
    name: 'TransactionDetailTest',
    component: TransactionDetail
  },
  {
    path: '/:net',
    name: 'HomeTest',
    component: Home
  },
  {
    path: '/onyxidlist/:pageSize/:pageNumber/:net',
    name: 'OntIdListDetailTest',
    component: OntIdListPage
  },
  {
    path: '/onyxid/:ontid/:pageSize/:pageNumber/:net',
    name: 'OntIdDetailTest',
    component: OntIdDetailPage
  },
  {
    path: '/address/:address/:assetName/:pageSize/:pageNumber/:net',
    name: 'AddressDetailTest',
    component: AddressDetailPage
  },
  {
    path: '/address/:address/:pageSize/:pageNumber/:net',
    name: 'AddressDetailTest',
    component: AddressDetailPage
  },
  {
    path: '/address/:address/:net',
    name: 'AddressDetailTest',
    component: AddressDetailPage
  },
  {
    path: '/contract/list/:pageSize/:pageNumber',
    name: 'ContractList',
    component: ContractList
  },
  {
    path: '/contract/list/:pageSize/:pageNumber/:net',
    name: 'ContractListTest',
    component: ContractList
  },
  {
    path: '/contract/:contractType/:contractHash/:pageSize/:pageNumber',
    name: 'ContractDetail',
    component: ContractDetail
  },
  {
    path: '/contract/:contractType/:contractHash',
    name: 'ContractDetailwithoutpage',
    component: ContractDetail
  },
  {
    path: '/contract/:contractHash/:pageSize/:pageNumber',
    name: 'ContractDetailwithoutType',
    component: ContractDetail
  },
  {
    path: '/contract/:contractHash',
    name: 'ContractDetailOnlyHash',
    component: ContractDetail
  },
  {
    path: '/contract/:contractType/:contractHash/:pageSize/:pageNumber/:net',
    name: 'ContractDetailTest',
    component: ContractDetail
  },
  {
    path: '/token/list/:contractType/:pageSize/:pageNumber',
    name: 'TokenList',
    component: TokenList
  },
  {
    path: '/token/list/:contractType/:pageSize/:pageNumber/:net',
    name: 'TokenListTest',
    component: TokenList
  },
  {
    path: '/token/detail/:contractType/:contractHash/:tokenName/:pageSize/:pageNumber',
    name: 'TokenDetail',
    component: TokenDetail
  },
  {
    path: '/token/detail/:contractType/:contractHash/:tokenName/:pageSize/:pageNumber/:net',
    name: 'TokenDetailTest',
    component: TokenDetail
  },
  {
    path: '/statistics/:day',
    name: 'Statistics',
    component: StatisticsTable
  },
  {
    path: '/statistics/:day/:net',
    name: 'StatisticsTest',
    component: StatisticsTable
  },
  {
    path: '/statistics/contract/:contractHash/:day',
    name: 'StatisticsContract',
    component: StatisticsTable
  },
  {
    path: '/statistics/contract/:contractHash/:day/:net',
    name: 'StatisticsContractTest',
    component: StatisticsTable
  },
  {
    path: '/form/contractform',
    name: 'ContractForm',
    component: ContractForm
  },
  {
    path: '/addresses/:pageSize/:pageNumber/:net',
    name: 'ContractFormTest',
    component: ContractForm
  },
];

const router = new Router({
  mode: 'history',
  routes: routes
});

export default router
