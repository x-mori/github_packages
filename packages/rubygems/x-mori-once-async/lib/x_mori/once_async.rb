require 'thread'
module XMori
  class OnceAsync
    def initialize(&block)
      raise ArgumentError, 'a block is required' unless block
      @block = block
      @mutex = Mutex.new
      @condition = ConditionVariable.new
      @state = :idle
    end

    def call
      @mutex.synchronize do
        @condition.wait(@mutex) while @state == :running
        return @value if @state == :done
        @state = :running
      end
      begin
        value = @block.call
        @mutex.synchronize { @value = value; @state = :done; @condition.broadcast }
        value
      rescue Exception
        @mutex.synchronize { @state = :idle; @condition.broadcast }
        raise
      end
    end
  end
end
