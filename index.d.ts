/**
 * 婚姻法
 */
declare class Law{}

/**
 * 匹配情况
 */
declare class MatchInfo{
    /**
     * 男/女 朋友
     */
    betrothal : any
    /**
     * 备胎们
     */
    benches : Array
}
/**
 * 加分项
 */
declare class Plus{
    /**
     * 加分项名称，没有实际意义
     */
    name : String

    /**
     * 加分项权值， 分数= pint * 你的返回值 ( true : 1 , false : 0)
     */
    point : Number

    /**
     * 可以是 同异步函数 ，返回值可以是数值，或者 true、false
     * 可以是 dson ，返回值是dson.doDraw的结果
     * 可以是以上类型的 Array
     */
    item : any
}

/**
 * 周大坤的渴望
 */
declare class Demand {
    /**
     * who you love
     * 支持 对象  ， 对象数组
     * 支持 同异步函数， 同异步函数数组
     * 支持 DSON ， DSON数组
     */
    love : any

    /**
     * what others must fits
     * 支持 对象  ， 对象数组
     * 支持 同异步函数， 同异步函数数组
     * 支持 DSON ， DSON数组
     */
    must : any

    /**
     * 加分项
     */
    pluses : Array<Plus>

}

  /**
   * 结婚类
   */
  declare class Marry{
  
    /**
     * 登陆人的需求
     * @param oneOrPairArray 登记对象，或者 登记对象、需求数组
     * @param demands  需求
     */
    book(oneOrPairArray, demands? : Demand) 

    /**
     * 未实现
     * @param law 
     */
    law(law ? : Law)  : Law

    /**
     * 接触交流
     * @param me 我
     * @param others 其他人 
     */
    touch(me, others :Array) : Promise<MatchInfo>
    
    /**
     * todo
     * @param array 
     */
    marry(array) : Array
  }
  
  declare function marry(law ? : Law): Marry
  
  export = marry