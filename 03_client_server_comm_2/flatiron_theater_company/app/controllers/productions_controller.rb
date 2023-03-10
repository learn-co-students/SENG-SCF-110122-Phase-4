class ProductionsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found
  
    def index 
        render json: Production.all, only: [:image, :id],  status: :ok
    end 

    def show
        production = Production.find(params[:id])
        render json: production, status: :ok
    end 

    def create   
        production = Production.create!(production_params)
        render json: production, status: :created
        # rescue ActiveRecord::RecordInvalid => invalid
        #     render json: {messages: invalid.record.errors}, status: :unprocessable_entity

        # render json: production, status: :created
        # if production.valid?
        #     render json: production, status: :created
        # else
        #     render json: { messages: production.errors.full_messages }, status: :unprocessable_entity
        # end
    end 

    def update 
        production = Production.find(params[:id])
        production.update(production_params)
        render json: production, status: :accepted
    end 

    def destroy
        production = Production.find(params[:id])
        production.destroy
        head :no_content 
    end 

    private

    def production_params
        params.permit(:title, :genre, :description, :budget, :image, :director, :ongoing)
    end 

    def render_unprocessable_entity(x)
        render json: {messages: x.record.errors}, status: :unprocessable_entity
    end

    def render_record_not_found (x)
        render json: { error:  x.message }, status: :not_found
    end

end
