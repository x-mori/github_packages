require 'thread'
module XMori
  # Runs a block once successfully, sharing its result across threads.
  class OnceAsync
    # Creates a reusable one-time computation.
    # @yield Block to run on the first call.
    # @raise [ArgumentError] if no block is given.
    def initialize(&block)
      raise ArgumentError, 'a block is required' unless block
      @block = block
      @mutex = Mutex.new
      @condition = ConditionVariable.new
      @state = :idle
    end

    # Returns the computed value, waiting if another thread is running it.
    # A failed block resets the state so a later call can retry.
    # @return [Object] the successful block result.
    # @raise [Exception] the error raised by the block for the calling thread.
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
