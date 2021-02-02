export default {
	//服务器
	'SERVER': 'http://localhost:5000/sys',



	'SYS_DICT_LIST': '/dict/list', //查询所有
  'SYS_DICT_DEL': '/dict/delete', //查询所有
  'SYS_DICT_SAVEANDUPDATE': '/dict/saveAndupdate', //查询所有
  'SYS_DICT_UPDATE': '/dict/update', //查询所有

  'SYS_INFORMATION_LIST': '/information/list', //查询最新资讯所有
  'SYS_INFORMATION_DEL': '/information/delete', //删除资讯
  'SYS_INFORMATION_SAVEANDUPDATE': '/information/saveAndupdate', //增加或者修改资讯




	//获得请求的完整地址，用于mockjs测试时使用
	'getFullPath': k => {
		return this.SERVER + this[k];
	}

}
